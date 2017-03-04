process.env.VUE_ENV = 'server'
process.traceDeprecation = true
const isProd = process.env.NODE_ENV === 'production'

const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const serialize = require('serialize-javascript')
const resolve = file => path.resolve(__dirname, file)



const app = express()

let indexHTML // generated by html-webpack-plugin
let renderer // created from the webpack-generated server bundle
if (isProd) {
    // 生产模式: 从 fs 创建服务器 HTML 渲染器和索引
    renderer = createRenderer(fs.readFileSync(resolve('./dist/server-bundle.js'), 'utf-8'))
    indexHTML = parseIndex(fs.readFileSync(resolve('./dist/index.html'), 'utf-8'))
} else {
    // 开发模式: 设置带有热重新加载的 dev 服务器，并在文件更改时更新渲染器和索引 HTML
    require('./build/setup-dev-server')(app, {
        bundleUpdated: bundle => {
            renderer = createRenderer(bundle)
        },
        indexUpdated: index => {
            indexHTML = parseIndex(index)
        }
    })
}




function createRenderer(bundle) {
    // https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
    return require('vue-server-renderer').createBundleRenderer(bundle, {
        cache: require('lru-cache')({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    })
}

function parseIndex(template) {
    return template.split('<!-- APP -->')
    // const contentMarker = '<!-- APP -->'
    // const i = template.indexOf(contentMarker)
    // return {
    //     head: template.slice(0, i),
    //     tail: template.slice(i + contentMarker.length)
    // }
}

const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
})

app.use(compression({
    threshold: 0
}))
app.use(favicon('./public/favicon.ico'))
app.use('/service-worker.js', serve('./dist/service-worker.js'))
app.use('/dist', serve('./dist'))
app.use('/public', serve('./public'))

app.get('*', (req, res) => {
    if (!renderer) {
        return res.end('waiting for compilation... refresh in a moment.')
    }

    res.setHeader("Content-Type", "text/html");
    var s = Date.now()
    const context = {
        url: req.url
    }

    const renderStream = renderer.renderToStream(context)


    renderStream.once('data', () => {
        res.write(indexHTML[0])
    })

    renderStream.on('data', chunk => {
        res.write(chunk)
    })

    renderStream.on('end', () => {
        // embed initial store state
        if (context.initialState) {
            res.write(`<script>window.__INITIAL_STATE__=${serialize(context.initialState, { isJSON: true })}</script>`)
        }
        res.end(indexHTML[1])
        console.log(`whole request: ${Date.now() - s}ms`)
    })

    renderStream.on('error', err => {
        if (err && err.code === '404') {
            res.status(404).end('404 | Page Not Found')
            return
        }
        // Render Error Page or Redirect
        res.status(500).end('Internal Error 500')
        console.error(`error during render : ${req.url}`)
        console.error(err)
    })
})

const port = process.env.PORT || 8088
app.listen(port, () => {
    console.log(`server started at localhost:${port}`)
})

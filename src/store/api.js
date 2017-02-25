import axios from 'axios'
import store from './index'

// const defaults = {
//     baseURL: 'http://localhost:3000/67api'
// }
//
// Object.assign(axios.defaults, defaults)
import api from 'create-api'

const prefix = `${api.host}`

const shouldCache = api.onServer

// Object.assign(axios.defaults, defaults)

// axios.interceptors.request.use(config => {
//     // store.dispatch('gStart')
//     // store.dispatch('FETCH_GLOBAL')
//     console.log('开始发送请求',new Date())
//     return config
// }, error => {
//     console.log('错误')
//     return Promise.reject(error)
// })
// //拦截请求加载动画
//
// axios.interceptors.response.use(response => {
//     // store.dispatch('gFinish')
//
//     console.log('相应成功',new Date())
//     return response
// }, error => {
//     console.log('响应失败')
//     return Promise.reject(error)
// })

// export const fetchApp = (model, query) => {
//     const target = `${prefix}${model}`
//     if (shouldCache && api.cache.has(target)) {
//         return Promise.resolve(api.cache.get(target))
//     }
//     return axios({
//         method: 'post',
//         url: target,
//         data: query,
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest',
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//         }
//     }).then(res => {
//         if (shouldCache) api.cache.set(target, response)
//         return res
//     })
//
// }

export const fetch = (model, query) => {
    const target = `${prefix}${model}`
    if (shouldCache && api.cache.has(target)) {
        return Promise.resolve(api.cache.get(target))
    }

    return axios.post(target, query).then((response) => {
        if (shouldCache) api.cache.set(target, response)
        return response
    })
}


// export const fetch1 = (model, query) => {
//     const target = `${prefix}${model}`
//     return new Promise((resolve, reject) => {
//         if (shouldCache && api.cache.has(target)) {
//             resolve(api.cache.get(target))
//         }
//
//         axios.post(target, query).then((response) => {
//             if (shouldCache) api.cache.set(target, response)
//             resolve(response)
//         })
//     });
// }
//
//
// export const fetchGlobal = (params) => {
//     return fetch('/blog/global',params)
// }
//
// export const fetchCategory = () => {
//     return fetch('/blog/category')
// }
//
// export const fetchBasis = () => {
//     return fetch('/blog/basis')
// }
//
// export const fetchLinks = () => {
//     return fetch('/blog/link')
// }
//
// export const fetchArticle = (params) => {
//     return fetch('/blog/article/findById',params)
// }
//
export const hits = () => {
    return fetch('/blog/basis/hits')
}

export const readings = (params) => {
    return fetch('/blog/article/readings',params)
}
//
// export const fetchArticleList = (params) => {
//     return fetch('/blog/article',params)
// }
//
// export const fetchAllArticleList = () => {
//     return fetch('/blog/allArticle')
// }


// export const fetchCategory = () => {
//     return axios.post('/blog/category')
// }
//
// export const fetchBasis = () => {
//     return axios.post('/blog/basis')
// }
//
// export const fetchLinks = () => {
//     return axios.post('/blog/link')
// }
//
// export const fetchArticle = (id) => {
//     return axios.post('/blog/article/findById',{id:id})
// }
//
// export const hits = () => {
//     return axios.post('/blog/basis/hits')
// }






// import axios from 'axios'
// import api from 'create-api'
//
// const prefix = `${api.host}/api`
//
// const store = {}
// // should cache the response on the server side
// const shouldCache = api.onServer
//
// export default store
//
// store.fetch = (model, query) => {
//   const target = `${prefix}/${model}`
//   const key = target + JSON.stringify(query)
//   if (shouldCache && api.cache.has(key)) {
//     return Promise.resolve(api.cache.get(key))
//   }
//   return axios.get(target, { params: query }).then((response) => {
//     const result = response.data
//     if (shouldCache) api.cache.set(key, result)
//     return result
//   })
// }

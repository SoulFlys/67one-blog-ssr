import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
Vue.use(VueRouter)
const CreatePostView = process.BROWSER ? type => resolve => {
  System.import('../views/CreatePostView').then(component => {
    const target = component(type)
    resolve(target)
  })
} : require('../views/CreatePostView')

const Page = CreatePostView()
const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: "/",
            name: "/",
            component: require('../components/index.vue')
        }, {
            path: "/archive",
            name: "archive",
            component: require('../components/archive/index.vue')
        }, {
            path: "/links",
            name: "links",
            component: require('../components/links/index.vue')
        }, {
            path: "/list",
            name: "list",
            component: require('../components/article/list.vue')
        }, {
            path: "/article/:id",
            name: "article",
            component: Page
        }, {
            path: "/about",
            name: "about",
            component: require('../components/about/index.vue')
        }, {
            path: "/no",
            name: "no",
            component: require('../components/no.vue')
        }, {
            path: "*",
            component: require('../components/layout/404.vue')
        }
    ]
})
//
// router.beforeEach((to, from, next) => {
//     // 仅hash变化时，直接进入路由
//     if (to.path === from.path && to.hash !== from.hash) {
//         return next()
//     }
//
//     // Loading组件开始加载
//     console.log('startLoading'+new Date())
//
//     //结束 Loading
//     let endLoadingCallback = () => {
//         console.log('endLoading'+new Date());
//         next();
//     }
//
//     // 根据本博客的路由定义，一定有一个组件能够被匹配到
//     let component = router.getMatchedComponents(to.fullPath)[0]
//     console.log(component)
//     console.log(typeof component)
//     // 如果是一个异步组件，我们手动resolve它，再接着调用它的preFetch接口，这样可以避免闪屏
//     // 异步组件也是一个函数，但是它没有options这个值，可以据此做条件判断
//     // if (typeof component === 'function' && !component.options) {
//     //     console.log(123)
//     //     return new Promise((resolve, reject) => {
//     //         // 一个resolve函数
//     //         const _resolve = realComponent => {
//     //             resolve(realComponent)
//     //         }
//     //         // 对普通异步组件来说，它会在第一层中被直接resolve，因此直接将resolve函数传给它调用
//     //         let res = component(_resolve)
//     //         // 对工厂模式的组件生成函数来说，它第一层中产生的只是工厂函数，组件是在第二步中产生的
//     //         // 这种工厂函数是thenable的，因此将resolve函数用then传给第二层调用
//     //         if (res && res.then) {
//     //             res.then(_resolve)
//     //         }
//     //     }).then(component => {
//     //         // 这里的component就是异步组件加载完毕后的真实组件了，开始调用数据获取函数
//     //         return letsGo(component, store, to, endLoadingCallback)
//     //     })
//     // }
//     console.log(123456)
//     // 调用数据获取函数
//     letsGo(component, store, to, endLoadingCallback)
// })
//
// // 数据获取函数
// function letsGo(component, store, to, endLoadingCallback) {
//     // 如果preFetch钩子存在，调用这个钩子，并将endLoadingCallback这个停止loading并进入路由的回调传给它
//     console.log(component,component.preFetch)
//     if (component && component.preFetch) {
//         return component.preFetch(store,to, endLoadingCallback)
//     } else {
//         // 如果preFetch钩子不存在，说明这是一个静态页面，直接导航进入。
//         endLoadingCallback()
//     }
// }
export default router;

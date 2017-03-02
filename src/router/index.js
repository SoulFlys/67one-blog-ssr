import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
            component: require('../components/article/index.vue')
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

export default router;

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
            component: require('../views/index.vue')
        }, {
            path: "/archive",
            name: "archive",
            component: require('../views/archive.vue')
        }, {
            path: "/links",
            name: "links",
            component: require('../views/links.vue')
        }, {
            path: "/list",
            name: "list",
            component: require('../views/list.vue')
        }, {
            path: "/article/:id",
            name: "article",
            component: require('../views/article.vue')
        }, {
            path: "*",
            component: require('../views/404.vue')
        }
    ]
})


export default router;

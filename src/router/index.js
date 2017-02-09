import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import List from '../views/List.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: List
    }
  ]
})

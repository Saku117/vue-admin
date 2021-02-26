import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './static.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//动态路由
export default router

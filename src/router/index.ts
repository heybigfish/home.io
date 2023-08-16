import {
  createRouter,
  createWebHistory,
  RouteRecordRaw
} from 'vue-router'
// import Layout from '@/layout/Index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // alias: ['/home','/home2'],   // 别名，可以定义很多个
    // component: () => import('../views/home.vue'),
    // 重定向
    redirect: '/index'
  },
  {
    path: '/',
    component: () =>
      import('@/layout/Index.vue'),
    // 重定向
    children: [
      {
        path: '/index',
        name: 'index',
        component: () =>
          import('@/views/home.vue') // component: import('../views/reg.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/home/'),
  routes
})

export default router

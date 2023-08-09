import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // alias: ['/home','/home2'],   // 别名，可以定义很多个
    // component: () => import('../views/home.vue'),
    // 重定向
    // redirect: '/welcome',
    redirect: to => {
      console.log(to);
      return {
        path: '/home',
        query: {
          name: 'home'
        }
      }
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue')    // component: import('../views/reg.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory('/home/'),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/batchscript',
  },
  {
    path: '/batchscript',
    name: 'batchscript',
    hidden: true,
    component: () => import('@batchscript/views/batchscript/index.vue'),
    meta: {
      title: 'risen',
    },
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@batchscript/views/login/index.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})

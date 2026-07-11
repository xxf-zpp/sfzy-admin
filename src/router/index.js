import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
    },
    {
      path: '/backend',
      component: () => import('@/view/layout/LayoutContainer.vue'),
      redirect: '/backend/console',
      children: [
        {
          path: 'console',
          component: () => import('@/view/home/HomeConsole.vue'),
        },
        {
          path: 'user',
          component: () => import('@/view/user/PersonalInfo.vue'),
        },
      ],
    },
  ],
})

export default router

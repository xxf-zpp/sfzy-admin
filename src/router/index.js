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
          path: 'company',
          component: () => import('@/view/user/company.vue'),
        },
        {
          path: 'role',
          component: () => import('@/view/user/RoleList.vue'),
        },
        {
          path: 'point',
          component: () => import('@/view/user/PointList.vue'),
        },
        {
          path: 'user',
          component: () => import('@/view/user/userList.vue'),
        },
        {
          path: 'person',
          component: () => import('@/view/person/PersonalInfo.vue'),
        },
      ],
    },
  ],
})

export default router

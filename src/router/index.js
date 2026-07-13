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
        {
          path: 'category',
          component: () => import('@/view/course/CourseCategory.vue'),
        },
        {
          path: 'comment',
          component: () => import('@/view/course/CourseComment.vue'),
        },
        {
          path: 'favorite',
          component: () => import('@/view/course/CourseFavorite.vue'),
        },
        {
          path: 'info',
          component: () => import('@/view/course/CourseInfo.vue'),
        },
        {
          path: 'order',
          component: () => import('@/view/course/CourseOrder.vue'),
        },
        {
          path: 'video',
          component: () => import('@/view/course/CourseVideo.vue'),
        },
        {
          path: 'counselor',
          component: () => import('@/view/counselor/CounselorInfo.vue'),
        },
        {
          path: 'level',
          component: () => import('@/view/counselor/CounselorLevel.vue'),
        },
        {
          path: 'field',
          component: () => import('@/view/counselor/CounselorField.vue'),
        },
        {
          path: 'charge',
          component: () => import('@/view/counselor/ChargeCategory.vue'),
        },
        {
          path: 'standard',
          component: () => import('@/view/counselor/ChargeStandard.vue'),
        },
        {
          path: 'leave',
          component: () => import('@/view/counselor/Leave.vue'),
        },
        {
          path: 'counselorComment',
          component: () => import('@/view/counselor/CounselorComment.vue'),
        },
        {
          path: 'counselorOrder',
          component: () => import('@/view/counselor/CounselorOrder.vue'),
        },
        {
          path: 'notice',
          component: () => import('@/view/notice/Notice.vue'),
        },
        {
          path: 'articleCategory',
          component: () => import('@/view/content/ArticleCategory.vue'),
        },
        {
          path: 'articleList',
          component: () => import('@/view/content/ArticleList.vue'),
        },
        {
          path: 'fmCategory',
          component: () => import('@/view/content/FMCategory.vue'),
        },
        {
          path: 'fmList',
          component: () => import('@/view/content/FMList.vue'),
        },
        {
          path: 'fmAudio',
          component: () => import('@/view/content/FMAudio.vue'),
        },
        {
          path: 'konwledge',
          component: () => import('@/view/content/Knowledge.vue'),
        },
        {
          path: 'welfare',
          component: () => import('@/view/content/Welfare.vue'),
        },
        {
          path: 'assessCategory',
          component: () => import('@/view/assessment/AssessCategory.vue'),
        },
        {
          path: 'assessList',
          component: () => import('@/view/assessment/AssessList.vue'),
        },
        {
          path: 'bank',
          component: () => import('@/view/assessment/AssessBank.vue'),
        },
        {
          path: 'select',
          component: () => import('@/view/assessment/AssessSelect.vue'),
        },
        {
          path: 'result',
          component: () => import('@/view/assessment/AssessResult.vue'),
        },
        {
          path: 'question',
          component: () => import('@/view/interaction/Question.vue'),
        },
        {
          path: 'replay',
          component: () => import('@/view/interaction/Replay.vue'),
        },
        {
          path: 'appointment',
          component: () => import('@/view/appointment/Appointment.vue'),
        },
      ],
    },
  ],
})

export default router

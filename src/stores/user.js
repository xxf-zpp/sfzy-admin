import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 从 localStorage 恢复用户信息（防止刷新丢失）
  const saved = localStorage.getItem('userInfo')
  const userInfo = ref(saved ? JSON.parse(saved) : null)

  const isLoggedIn = computed(() => !!userInfo.value?.token)
  const avatar = computed(() => userInfo.value?.avatar || '')
  const nickname = computed(() => userInfo.value?.nickname || '用户昵称')
  const roleName = computed(() => userInfo.value?.roleName || '')

  /** 登录成功后设置用户信息 */
  const setUserInfo = (info) => {
    userInfo.value = info
    localStorage.setItem('token', info.token)
    localStorage.setItem('userInfo', JSON.stringify(info))
  }

  /** 退出登录清除信息 */
  const clearUserInfo = () => {
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  return { userInfo, isLoggedIn, avatar, nickname, roleName, setUserInfo, clearUserInfo }
})

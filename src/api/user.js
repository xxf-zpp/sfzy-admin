import { del, get, post } from '@/utils/request'

/**
 * 用户登录
 */
export const login = ({ username, userpwd }) => {
  return post('/user/login', { username, userpwd })
}

/**
 * 退出登录
 */
export const logout = () => {
  return post('/user/logout')
}

/**
 * 发送短信验证码
 */
export const sendCode = (mobile) => {
  return get('/user/code', { mobile })
}

/**
 * 获取用户列表
 */
export const fetchUserList = ({ pageNum, pageSize, username, nickname, mobile } = {}) => {
  const params = { pageNum, pageSize }
  if (username) params.username = username
  if (nickname) params.nickname = nickname
  if (mobile) params.mobile = mobile
  return get('/user/list', params)
}

/**
 * 新增用户
 */
export const addUser = (data) => {
  return post('/user/add', data)
}

/**
 * 更新用户
 */
export const updateUser = (data) => {
  return post('/user/update', data)
}

/**
 * 删除用户
 */
export const deleteUser = (id) => {
  return del('/user', { id })
}

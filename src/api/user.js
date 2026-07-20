import request, { get, post, put, upload } from '@/utils/request'

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
 * 用户注册
 */
export const register = ({ mobile, code, userpwd, reuserpwd, email }) => {
  return post('/user/register', { mobile, code, userpwd, reuserpwd, email })
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
  return put('/user/update', data)
}

/**
 * 删除用户（单个/批量）
 */
export const removeUsers = (ids) => {
  const body = new URLSearchParams({ ids }).toString()
  return request('/user/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}

/**
 * 上传用户头像
 */
export const uploadUserAvatar = (file) => {
  return upload('/upload', file, 'file')
}

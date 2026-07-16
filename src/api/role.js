import { del, get, post } from '@/utils/request'

/**
 * 获取角色列表
 */
export function fetchRoleList({ pageNum, pageSize, roleCode, roleName } = {}) {
  const params = { pageNum, pageSize }
  if (roleCode) params.roleCode = roleCode
  if (roleName) params.roleName = roleName
  return get('/role/list', params)
}

/**
 * 新增角色
 */
export function addRole({ roleCode, roleName, description }) {
  return post('/role/add', { roleCode, roleName, description })
}

/**
 * 更新角色
 */
export function updateRole({ id, roleCode, roleName, description }) {
  return post('/role/update', { id, roleCode, roleName, description })
}

/**
 * 删除角色
 */
export function deleteRole(roleName) {
  return del('/role', { roleName })
}

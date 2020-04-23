import request from '@/utils/request'

// 获取所有的权限树
export function getPermissionTree() {
  return request({
    url: 'system/permissions/tree',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'system/permissions',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'system/permissions/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/permissions',
    method: 'put',
    data
  })
}

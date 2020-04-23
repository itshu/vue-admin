import request from '@/utils/request'

// 获取所有的Role
export function getRoleTree() {
  return request({
    url: 'system/roles/tree',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'system/roles',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'system/roles/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'system/roles',
    method: 'put',
    data
  })
}

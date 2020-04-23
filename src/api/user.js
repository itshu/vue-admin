import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'user/users',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'user/users/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'user/users',
    method: 'put',
    data
  })
}

export function validPass(pass) {
  return request({
    url: 'user/users/validPass/' + pass,
    method: 'get'
  })
}

export function updatePass(pass) {
  return request({
    url: 'user/users/updatePass/' + pass,
    method: 'get'
  })
}

export function updateEmail(code, data) {
  return request({
    url: 'user/users/updateEmail/' + code,
    method: 'post',
    data
  })
}


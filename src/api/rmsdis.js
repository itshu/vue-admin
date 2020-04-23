import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/rmsdis/pageList',
    method: 'post',
    data: params
  })
}

export function createData(params) {
  return request({
    url: '/rmsdis/save',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/rmsdis/update',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: '/rmsdis/delete',
    method: 'post',
    data: params
  })
}

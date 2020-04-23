import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/operationLog/pageList',
    method: 'post',
    data: params
  })
}

export function createData(params) {
  return request({
    url: '/operationLog/save',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/operationLog/update',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: '/operationLog/delete',
    method: 'post',
    data: params
  })
}

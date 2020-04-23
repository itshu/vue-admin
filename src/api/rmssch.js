import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/rmsSch/pageList',
    method: 'post',
    data: params
  })
}

export function createData(params) {
  return request({
    url: '/rmsSch/save',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/rmsSch/save',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: '/rmsSch/delete',
    method: 'post',
    data: params
  })
}

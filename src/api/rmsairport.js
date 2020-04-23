import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/rmsAirport/pageList',
    method: 'post',
    data: params
  })
}

export function createData(params) {
  return request({
    url: '/rmsAirport/save',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/rmsAirport/save',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: '/rmsAirport/delete',
    method: 'post',
    data: params
  })
}

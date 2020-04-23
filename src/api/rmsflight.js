import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/rmsFlight/pageList',
    method: 'post',
    data: params
  })
}

export function createData(params) {
  return request({
    url: '/rmsFlight/save',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/rmsFlight/update',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: '/rmsFlight/delete',
    method: 'post',
    data: params
  })
}

export function detailData(params) {
  return request({
    url: '/rmsFlight/detail',
    method: 'post',
     params
  })
}

export function rmsFlightSales(params) {
  return request({
    url: '/rmsFlight/sales',
    method: 'post',
    data: params
  })
}

export function rmsFlightSalesProtect(params) {
  return request({
    url: '/rmsFlight/protect',
    method: 'post',
    data: params
  })
}

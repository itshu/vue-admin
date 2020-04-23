import request from '@/utils/request'

export function treeList(params) {
  return request({
    url: '/rmscabin/treeList',
    method: 'get',
    params
  })
}

export function orderList(params) {
  return request({
    url: '/rmscabin/orderList',
    method: 'get',
    params
  })
}

export function cabinList(params) {
  return request({
    url: '/rmscabin/list',
    method: 'get',
    params
  })
}

export function addNode(params) {
  return request({
    url: '/rmscabin/addNode',
    method: 'post',
    data: params
  })
}

export function editNode(params) {
  return request({
    url: '/rmscabin/editNode',
    method: 'post',
    data: params
  })
}

export function deleteNode(params) {
  return request({
    url: '/rmscabin/deleteNode',
    method: 'get',
    params
  })
}

export function exportExcel(params) {
  return request({
    url: '/rmscabin/exportExcel',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}

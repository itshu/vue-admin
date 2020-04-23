import request from '@/utils/request'

export function treeList(params) {
  return request({
    url: '/rmsRegion/treeList',
    method: 'get',
    params
  })
}

export function treeJson(params) {
  return request({
    url: '/rmsRegion/treeJson',
    method: 'get',
    params
  })
}

export function tree(params) {
  return request({
    url: '/rmsRegion/tree',
    method: 'get',
    params
  })
}

export function addNode(params) {
  return request({
    url: '/rmsRegion/addNode',
    method: 'post',
    data: params
  })
}

export function editNode(params) {
  return request({
    url: '/rmsRegion/editNode',
    method: 'post',
    data: params
  })
}

export function deleteNode(params) {
  return request({
    url: '/rmsRegion/deleteNode',
    method: 'get',
    params
  })
}

export function exportExcel(params) {
  return request({
    url: '/rmsRegion/exportExcel',
    method: 'post',
    data: params,
    responseType: 'blob'
  })
}


export function exportExceltest() {
  return request({
    url: '/excel/testObject2Excel',
    method: 'get',
    responseType: 'blob'
  })
}

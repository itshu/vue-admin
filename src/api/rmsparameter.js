import request from '@/utils/request'

export function saveParameter(params) {
  return request({
    url: '/rmsParameter/save',
    method: 'post',
    data: params
  })
}

export function detailParameter(params) {
  return request({
    url: '/rmsParameter/list',
    method: 'get',
    params
  })
}


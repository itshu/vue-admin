import request from '@/utils/request'

export function createConnData(params) {
  return request({
    url: '/rmsInfluenceLink/save',
    method: 'post',
    data: params
  })
}

export function updateConnData(params) {
  return request({
    url: '/rmsInfluenceLink/update',
    method: 'post',
    data: params
  })
}

export function deleteConnData(params) {
  return request({
    url: '/rmsInfluenceLink/delete',
    method: 'post',
    params
  })
}

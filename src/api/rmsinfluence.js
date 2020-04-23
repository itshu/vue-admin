import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/rmsInfluence/pageList',
    method: 'post',
    data: params
  })
}

export function detailData(params) {
  return request({
    url: '/rmsInfluence/detail',
    method: 'post',
    params
  })
}

export function createData(params) {
  return request({
    url: '/rmsInfluence/save',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/rmsInfluence/update',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: '/rmsInfluence/delete',
    method: 'post',
    params
  })
}

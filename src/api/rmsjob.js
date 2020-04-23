import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/rmsJobs/pageList',
    method: 'post',
    data: params
  })
}

export function createData(params) {
  return request({
    url: '/rmsJobs/save',
    method: 'post',
    data: params
  })
}

export function updateData(params) {
  return request({
    url: '/rmsJobs/update',
    method: 'post',
    data: params
  })
}

export function deleteData(params) {
  return request({
    url: '/rmsJobs/delete',
    method: 'post',
    data: params
  })
}

export function exportCsv(params) {
  return request({
    url: '/rmsJobs/exportCsv',
    method: 'post',
    data: params
  })
}

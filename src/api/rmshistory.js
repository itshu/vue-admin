import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/rmshistory/dataList',
    method: 'post',
    data: params
  })
}

export function getHistoryPercent(params) {
  return request({
    url: '/rmshistory/history',
    method: 'post',
    data: params
  })
}

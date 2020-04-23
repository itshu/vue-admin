import request from '@/utils/request'

export function getOccupancy(params) {
  return request({
    url: '/bigdata/getOccupancy',
    method: 'post',
    data: params
  })
}


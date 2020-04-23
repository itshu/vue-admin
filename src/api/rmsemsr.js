import request from '@/utils/request'

export function getEmsr(params) {
  return request({
    url: '/rmsLegCompartment/getEmsr',
    method: 'post',
    data: params
  })
}

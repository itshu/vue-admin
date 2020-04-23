import request from '@/utils/request'

export function LegCompartmentlist(params) {
  return request({
    url: '/rmsLegCompartment/legList',
    method: 'post',
    data: params
  })
}

export function SegCabinList(params) {
  return request({
    url: '/rmsSegCabin/segList',
    method: 'post',
    data: params
  })
}

export function flightInfluenceLink(params) {
  return request({
    url: '/rmsInfluenceLink/flightLink',
    method: 'post',
    data: params
  })
}

export function reserveInfluenceList(params) {
  return request({
    url: '/rmsInfluenceLink/reserveLink',
    method: 'get',
    params
  })
}


export function flightDates(params) {
  return request({
    url: '/rmsFlight/dates',
    method: 'post',
    data: params
  })
}

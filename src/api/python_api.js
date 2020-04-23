import request from '@/utils/request'

export function instant(params) {
  return request({
    url: '/python/instant',
    method: 'post',
    data: params
  })
}


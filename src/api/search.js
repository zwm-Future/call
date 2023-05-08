import request from '@/utils/request.js'

export function getMessage(data) {
    return request({
      url: '/appointment/message',
      method: 'get',
      params:data,
    })
}
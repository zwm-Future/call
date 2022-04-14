import request from '@/utils/request.js'

export function getTips() {
    return request({
      url: '/admin/announcement',
      method: 'GET',
    })
}
import request from '@/utils/request.js'

export function login(data) {
    return request({
      url: '/worker/login',
      method: 'post',
      data,
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8'
    //   }
    })
}

export function logout(data) {
    return request({
      url: '/worker/logout',
      method: 'POST',
      data
    })
  }
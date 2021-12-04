import request from '@/utils/request.js'
/* 
    预约叫号
*/
export function signCall(window) {
  return request({
    url: '/call/SignCall',
    method: 'post',
    params: {
      window
    },
  })
}

/* 
    现场叫号
*/
export function siteCall(window) {
  return request({
    url: '/call/siteCall',
    method: 'GET',
    params: {
      window
    },
  })
}
/* 
    加急叫号

*/
export function urgentCall(window) {
  return request({
    url: '/call/urgentCall',
    method: 'post',
    params: {
      window
    },
  })
}
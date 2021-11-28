import request from '@/utils/request.js'
/* 
    预约叫号
*/
export function signCall(data) {
    return request({
      url: '/call/SignCall',
      method: 'post',
      params:data,
    })
}

/* 
    现场叫号
*/
export function siteCall(data) {
    return request({
      url: '/call/siteCall',
      method: 'post',
      params:data,
    })
}
/* 
    加急叫号

*/
export function urgentCall(data) {
    return request({
      url: '/call/urgentCall',
      method: 'post',
      params:data,
    })
}
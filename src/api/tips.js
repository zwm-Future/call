import request from '@/utils/request.js'

export function getTips() {
  return request({
    url: '/admin/announcement',
    method: 'GET',
  })
}

// 对外窗口提示
// temp api ,may change in the future
export function getTips2() {
  return request({
    url: "/admin/windowsText",
    method: "GET"
  })
}
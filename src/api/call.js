import request from '@/utils/request.js'

// 叫号
export function callApi(type, window, workerId) {
  console.log(type, window)
  let url = '';
  let params = { window };
  switch (type) {
    case "预约":
      url = '/call/SignCall';
      params = {
        window,
        workerId
      }
      break
    case "现场":
      url = '/call/siteCall'
      break
    case "加急":
      url = '/call/urgentCall'
      break
    default:
      return Promise.reject({ data: "类型错误" })
  }
  return request({
    url,
    method: "GET",
    params
  })
}


// 根据名字获取队列名称
export function getQueue(name) {
  return request({
    url: '/signIn/findQueueByName',
    method: "GET",
    params: {
      name
    }
  })
}

// 滞后
export function delay(type, userId) {
  let url = ''
  switch (type) {
    case "预约":
      url = '/signIn/subLag'
      break
    case "现场":
      url = '/signIn/siteLag'
      break
    case "加急":
      url = "/signIn/urgentLag"
      break
    default:
      return Promise.reject({ data: "类型错误" })
  }

  return request({
    url,
    method: "GET",
    params: {
      userId
    }
  })
}

// 手动处理完成
export function mannual(type, userNumber, workerId) {
  let data = {};
  let url = ''
  switch (type) {
    case "预约":
      url = '/call/signFinish';
      data = { userNumber, workerId }
      break
    case "现场":
      url = '/call/siteFinish'
      data = { userNumber }
      break
    case "加急":
      url = '/call/urgentFinish'
      data = { userNumber }
      break
    default:
      return Promise.reject({ data: "类型错误" })
  }

  return request({
    url,
    method: "DELETE",
    data
  })

}

// // 预约手动完成

export function appointmentMannual(number, workerId) {
  return request({
    url: "/appointment/editSelf",
    method: "PUT",
    data: {
      number,
      workerId
    }
  })

}

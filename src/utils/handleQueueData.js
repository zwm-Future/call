// 处理大屏的队列信息
// 此方法进行了改写 ，如果上线使用，请测试
export function handleQueues(arr) {
    return  arr.map(v => {
      /* -1 表示未被叫号 , 否则为叫号的窗口号 */
        let isCalled = parseInt(v.status) !== -1
        return {
            windowNum: (<div style={{ textAlign: 'center', color: isCalled ? 'red' : '#000', fontWeight: isCalled ? 'bold' : 'normal' }} > {isCalled ? v.status : '待定'}</ div>),
            name: handleName(v.user.name + ''),
            /* 排队序号，如果是有预约的 ，显示预约号第一个 */
            key: v.appointments ?
                v.appointments[0].reservationNumber : v.location,
        }
    })
}

// 处理姓名
// 此方法进行了改写 ，如果上线使用，请测试
function handleName(userName) {
    userName = userName.trim()
    let Len = userName.length

    if (Len === 2) {
        return userName.substr(0, 1) + '*'
    }
    else {
        return userName.substr(0, 1) +  ('*'.repeat(Len-2)) + userName.substr(-1, 1)
    }
}

// 获取叫号信息，返回叫号数组 ，每个人默认叫3次
// 此方法进行了改写 ，如果上线使用，请测试
export function callQueue(queue, {status:windowNum,user:{name},appointments,location}) {
    /* 窗口号进行处理 */
    if (windowNum !== "总复核") {
      windowNum += "号"
    }

    let number = appointments ?
    appointments[0].reservationNumber : location;

    let text = `请${queue}。排队序号为,${number},${name},到${windowNum}窗口`
    return [[text, text, text].join('。。')]  // 句号停顿久
}

// 处理业务页面的队列
// 此方法进行了改写 ，如果上线使用，请测试
export function handleQueueAtP(arr) {
   return arr.map(({user:{number,name},appointments,location}) => {
        return {
            id: number,  // 学号
            name,
            appointments,
            key: appointments ?
               appointments[0].reservationNumber : location,

        }
    })
}
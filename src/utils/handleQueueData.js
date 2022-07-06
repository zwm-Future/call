// 处理仅显示排队的队列信息
export function handleQueues(arr) {
    // console.log("LOG", arr);
    let newList = []
    arr.forEach((v, i) => {
        newList.push({
            windowNum: (<div style={{ textAlign: 'center', color: v.status !== -1 ? 'red' : '#000', fontWeight: v.status !== -1 ? 'bold' : 'normal' }} > {v.status !== -1 ? v.status : '待定'}</ div>),
            name: handleName(v.user.name + ''),
            key: v.appointments ?
                v.appointments[0].reservationNumber : v.location,
        })
    })
    return newList
}

// 处理姓名
function handleName(userName) {
    userName = userName.trim()
    let Len = userName.length

    if (userName.length === 2) {
        return userName.substr(0, 1) + '*'
    }
    else {
        let middle = '', len = Len - 2
        while (len > 0) {
            middle += '*'
            len--
        }
        return userName.substr(0, 1) + middle + userName.substr(-1, 1)
    }
}

// 获取叫号信息，返回叫号数组
export function callQueue(queue, user) {
    let window = user.status;
    let number = user.appointments ?
        user.appointments[0].reservationNumber : user.location;
    // let text = numToChNum(`请排队序号为-${number}-到-${window}号窗口`)
    let text = `请${queue}。排队序号为,${number},到,${window}号窗口`
    // alert(text)
    return [[text, text, text].join('。。')]
}


/* 将传入的字符串里的阿拉伯数字转换成汉语数字
function numToChNum(str) {
    return str.replace(/1/g, '一')
        .replace(/2/g, '二')
        .replace(/3/g, '三')
        .replace(/4/g, '四')
        .replace(/5/g, '五')
        .replace(/6/g, '六')
        .replace(/7/g, '七')
        .replace(/8/g, '八')
        .replace(/9/g, '九')
        .replace(/0/g, '零')
} */

// 处理业务页面的队列
export function handleQueueAtP(arr) {
    let newList = []
    arr.forEach((v, i) => {
        newList.push({
            id: v.user.number,  // 学号
            name: v.user.name,
            key: v.appointments ?
                v.appointments[0].reservationNumber : v.location,
            appointments: v.appointments
        })
    })
    return newList
}
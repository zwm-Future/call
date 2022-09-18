// 处理仅显示排队的队列信息
export function handleQueues(arr) {
    // console.log("LOG", arr);
    let newList = []
    arr.forEach((v, i) => {
        let isCalled = parseInt(v.status) !== -1
        newList.push({
            windowNum: (<div style={{ textAlign: 'center', color: isCalled ? 'red' : '#000', fontWeight: isCalled ? 'bold' : 'normal' }} > {isCalled ? v.status : '待定'}</ div>),
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
        return name.substr(0, 1) + middle + name.substr(-1, 1)
    }
}

// 获取叫号信息，返回叫号数组
export function callQueue(queue, user) {
    let window = user.status;
    if (window !== "总复核") {
        window += "号"
    }

    let userName = user.user.name;
    console.log('用户', user);
    let number = user.appointments ?
        user.appointments[0].reservationNumber : user.location;

    let text = `请${queue}。排队序号为,${number},${userName},到${window}窗口`
    return [[text, text, text].join('。。')]
}

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
import { memo, useEffect, useState } from 'react'
import Header from './header'
import Queue from './queue'
import ProcessTable from './processTable'

import { callApi, getQueue, delay, mannual, appointmentMannual } from '@/api/call.js'
import { getWorker } from '@/utils/user'
import { handleQueueAtP } from '@/utils/handleQueueData'
import { message } from 'antd'

let defaultInfo = () => ({
    name: '无数据',
    id: '无数据',
    number: "无数据"
})

export default memo(function Processing(props) {
    let { currentNum: window, title } = props.date

    let [queueData, updateQueue] = useState([])
    let [personInfo, updatePersonInfo] = useState(defaultInfo())

    // eslint-disable-next-line
    let [MannualPersonInfo, updateMannualPersonInfo] = useState(defaultInfo())
    // let [isMannual, switchMannul] = useState(0)

    let [workerId, getWorkerId] = useState('0')
    useEffect(() => {
        const { id: _workerId } = getWorker()
        if (!_workerId) return;
        getWorkerId(_workerId);
        getQueueData()
    }, []) // eslint-disable-line


    // 未到
    function handleDelay(userInfo) {
        console.log(userInfo);

        // if (isMannual) {
        //     switchMannul(0)
        //     return
        // }
        let { id, name } = userInfo;
        let query = {}
        if (title === '对外') query.name = name
        else query.userId = id
        // console.log("DELAYID", userId);
        delay(title, query)
            .then(res => {
                console.log("Delay", res.message)
                if (res.message === "滞后成功") {
                    callNext(true)
                } else {
                    message.error("滞后失败")
                }
            })
            .catch(err => {
                message.error("滞后失败")
                console.log("Delay Error", err);
            })
    }

    // 叫号 （下一位）
    async function callNext(isDelay = false) {
        // if (isMannual) {  // 处于手动状态
        //     switchMannul(0)
        //     return
        // }
        const res = await callApi(title, window, workerId)
        
        if (res.code === 1) {
            message.warning(res.message)
            updatePersonInfo(defaultInfo())
            return
        }

        let { user, appointments, location } = JSON.parse(res.message)
        // console.log("appointments", appointments)
        let infor = {
            id: user.number,  // 学号
            name: user.name,
            number: appointments ? appointments[0].reservationNumber : location,
            appointments: handleTickets(appointments)
        }
        updatePersonInfo(infor)
        getQueueData(true)
        console.log("personInfo", personInfo);

    }

    // 手动处理
    function mannualHandle({ name, id }) {
        console.log(title + "手动处理ID", id)

        if (title === "预约") {
            //     queueData.some(v => {
            //         if (v.id === userId) {
            //             // updateMannualPersonInfo()
            //             console.log("手动处理人的信息?", v)
            //             let { appointments } = v
            //             console.log("appointments", appointments)
            //             let infor = {
            //                 id: userId,  // 学号
            //                 name: v.name,
            //                 number: appointments ? appointments[0].reservationNumber : 1,
            //                 appointments: handleTickets(appointments)
            //             }
            //             updateMannualPersonInfo(infor)
            //             switchMannul(++isMannual)
            //             return true
            //         }
            //         return false
            //     })
            appointmentMannual(id, workerId).then(res => {
                // console.log("手动处理!", res);
                if (res.message === "还没有人被叫号") {
                    message.warning("请先叫号")
                }
                getQueueData(true)

            }).catch(err => {
                console.log("手动处理 ERROR ", err);
                message.error("手动处理失败")
            })
            return;
        }
        let query2 = id
        if (title === '对外') query2 = name
        mannual(title, query2, workerId).then(res => {
            console.log("手动处理!", res);
            if (res.message === "还没有人被叫号") {
                message.warning("请先叫号")
            }
            getQueueData(true)

        }).catch(err => {
            console.log("手动处理 ERROR ", err);
            message.error("手动处理失败")
        })
    }

    // 处理单号
    function handleTickets(appointments) {
        if (!appointments) {
            return null
        }
        let newAppointments = []
        appointments.forEach(v => {
            newAppointments.push({
                key: v.orderNumber,
                userId: v.userId,
            })
        })
        return newAppointments
    }

    // 刷新队列
    function getQueueData(alert = false) {
        getQueue(title + '队列').then(res => {
            // console.log("队列信息", res);
            updateQueue(handleQueueAtP(res.other))
            if (alert) return
            // console.log(title + '队列信息', res.other)
            message.success("数据刷新成功")
        }).catch(err => {
            message.warning("获取信息失败")
            console.log("ERR", err);
        })
    }

    return (
        <div style={{ padding: 10 }}>
            <Header title={title} window={window} />
            <div style={{
                display: 'flex'
            }}>
                <div style={{ width: '40%' }}><Queue list={queueData} title={title} getQueueData={getQueueData} mannualHandle={mannualHandle} /></div>
                <div style={{ width: '60%' }} ><ProcessTable personInfo={personInfo} MannualPersonInfo={MannualPersonInfo} callNext={callNext} handleDelay={handleDelay} /></div>
            </div>
        </div>
    )
})

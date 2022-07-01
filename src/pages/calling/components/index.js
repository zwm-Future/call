import { memo, useEffect, useState } from 'react'
import Header from './header'
import Queue from './queue'
import ProcessTable from './/processTable'

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

        let { id, name } = userInfo;
        let query = {}
        if (title === '对外') query.name = name
        else query.userId = id

        delay(title, query)
            .then(res => {
                console.log("Delay", res)
                if (res.message === "滞后成功") {
                    // 如果还有人在排队
                    if (res.other > 1) {
                        callNext(true)
                    } else {
                        getQueueData(true)
                        updatePersonInfo(defaultInfo())
                    }
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
        const res = await callApi(title, window, workerId)

        if (res.code === 1) {
            message.warning(res.message)
            updatePersonInfo(defaultInfo())
            return
        }

        let { user, appointments, location } = JSON.parse(res.message)

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
            appointmentMannual(id, workerId).then(res => {
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
    function getQueueData(NotAlert = false) {
        getQueue(title + '队列').then(res => {

            updateQueue(handleQueueAtP(res.other))
            checkUnFinish(res.data)
            if (NotAlert) return

            message.success("数据刷新成功")
        }).catch(err => {
            message.warning("获取信息失败")
            console.log("ERR", err);
        })
    }

    // 检查是否有未处理完的任务
    function checkUnFinish(calledList = []) {
        // eslint-disable-next-line array-callback-return
        calledList.some(v => {
            if (v.status == window) {
                let { user, appointments, location } = v

                let infor = {
                    id: user.number,  // 学号
                    name: user.name,
                    number: appointments ? appointments[0].reservationNumber : location,
                    appointments: handleTickets(appointments)
                }
                updatePersonInfo(infor)
                return true
            }
            return false
        })
    }

    return (
        <div style={{ padding: 10 }}>
            <Header title={title} window={window} />
            <div style={{
                display: 'flex'
            }}>
                <div style={{ width: '40%' }}><Queue list={queueData} title={title} getQueueData={getQueueData} mannualHandle={mannualHandle} /></div>
                <div style={{ width: '60%' }} ><ProcessTable title={title} personInfo={personInfo} callNext={callNext} handleDelay={handleDelay} /></div>
            </div>
        </div>
    )
})

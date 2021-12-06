import { memo, useEffect, useState } from 'react'
import Header from './header'
import Queue from './queue'
import ProcessTable from './processTable'
import { callApi, getQueue, delay, mannual } from '@/api/call.js'
import { handleQueueAtP } from '@/utils/handleQueueData'
import { message } from 'antd'

export default memo(function Processing(props) {
    let { currentNum: window, title } = props.date

    let [queueData, updateQueue] = useState([])
    let [personInfo, updatePersonInfo] = useState({
        name: '无数据',
        id: '无数据',
        number: "无数据"
    })

    let [MannualPersonInfo, updateMannualPersonInfo] = useState({
        name: '无数据',
        id: '无数据',
        number: "无数据"
    })
    let [isMannual, switchMannul] = useState(0)

    useEffect(() => {
        getQueueData()
        return () => {
            exitCallb()
        }
    }, [personInfo, MannualPersonInfo]) // eslint-disable-line

    // 退出回调
    function exitCallb() {
        console.log("退出回调", personInfo.name)
        // if (personInfo.name !== "无数据") {
        //     console.log("自动处理", personInfo.id)
        //     mannual(title, personInfo.id).then(res => {
        //         console.log("自动处理", res)
        //     }).catch(err => { console.log("自动处理失败", err) })
        // }
    }

    // 未到
    function handleDelay(userId) {
        if (isMannual) {
            switchMannul(0)
            return
        }
        console.log("DELAYID", userId);
        delay(title, userId)
            .then(res => {
                console.log("Delay", res)
            })
            .catch(err => {
                console.log("Delay Error", err);
            })
        callNext()
    }

    // 叫号 （下一位）
    function callNext() {
        if (isMannual) {
            switchMannul(0)
            return
        }
        callApi(title, window)
            .then(res => {
                if (res.code === 1) {
                    message.warning("当前无人排队")
                    let personData = {
                        name: '无数据',
                        id: '无数据',
                        number: "无数据"
                    }
                    updatePersonInfo(personData)
                    return
                }
                console.log(res)
                console.log('排队信息（仅待定）', res.other)

                console.log("此窗口当前处理对象", JSON.parse(res.message))
                let { user, appointments } = JSON.parse(res.message)
                console.log("appointments", appointments)
                let infor = {
                    id: user.number,  // 学号
                    name: user.name,
                    number: appointments ? appointments[0].reservationNumber : 1,
                    appointments: handleTickets(appointments)
                }
                updatePersonInfo(infor)
                console.log("personInfo", personInfo);
            }).catch(err => {
                console.log('err', err)
            })
    }

    // 手动处理
    function mannualHandle(userId) {
        console.log(title + "手动处理ID", userId)

        if (title === "预约") {
            queueData.some(v => {
                if (v.id === userId) {
                    // updateMannualPersonInfo()
                    console.log("手动处理人的信息?", v)
                    let { appointments } = v
                    console.log("appointments", appointments)
                    let infor = {
                        id: userId,  // 学号
                        name: v.name,
                        number: appointments ? appointments[0].reservationNumber : 1,
                        appointments: handleTickets(appointments)
                    }
                    updateMannualPersonInfo(infor)
                    switchMannul(++isMannual)
                    return true
                }
                return false
            })
            // updateQueue(newQueue)
            // return
        }
        mannual(title, userId).then(res => {
            console.log("手动处理", res);
            console.log("手动处理 data", res.data)
            console.log("手动处理 message", JSON.parse(res.message))
            console.log("手动处理 other", res.other)
        }).catch(err => {
            console.log("手动处理 ERROR ", err);
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
                key: v.id,
                userId: v.userId,
            })
        })
        return newAppointments
    }

    // 刷新队列
    function getQueueData(alert = false) {
        getQueue(title + '队列').then(res => {
            updateQueue(handleQueueAtP(res.other))
            if (alert) return
            console.log(title + '队列信息', res.other)
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
                <div style={{ width: '60%' }} ><ProcessTable isMannual={isMannual} personInfo={personInfo} MannualPersonInfo={MannualPersonInfo} callNext={callNext} handleDelay={handleDelay} /></div>
            </div>
        </div>
    )
})

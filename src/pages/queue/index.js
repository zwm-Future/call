import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import createWebSocket from '@/utils/websocket'
import FullBtn from '@/components/fullBtn'
import Cqueue from '@/components/Cqueue'
import Speaker from '@/utils/Speaker'
import { InfoCircleOutlined } from '@ant-design/icons'
import { handleQueues, callQueue } from '@/utils/handleQueueData'
import { message } from 'antd'
import { webSocketUrl } from '@/api/baseUrl'

export default memo(function Queue(props) {
    // const QueueSpeaker = useRef(new Speaker('zh-CN', 2, 2, 2)).current
    const QueueSpeaker = new Speaker({ lang: 'zh-CN', pitch: 1, rate: 0.9, volume: 1 })
    const full_timer = useRef(null);
    const [btn_class, setClass] = useState("full-btn")

    // 队列数据
    const [appointmentList, updateAList] = useState([])
    const [siteList, updateSList] = useState([])
    const [uergentList, updateUKist] = useState([])

    // 是否全屏
    const [isFullScreen, updateFSstatues] = useState(false)
    useEffect(() => {
        const getMes = (e) => {
            let data = JSON.parse(e.data)
            console.log("数据变动Data", data);
            if (data.other) {  // 数据变动
                let other = JSON.parse(data.other)
                let queueMessage = JSON.parse(data.queueMessage)

                switch (data.name) {
                    case '预约队列':
                        updateAList(handleQueues([...queueMessage, ...other]))
                        break
                    case "现场队列":
                        updateSList(handleQueues([...queueMessage, ...other]))
                        break
                    case "加急队列":
                        updateUKist(handleQueues([...queueMessage, ...other]))
                        break
                    default:
                        message.error("匹配失败")
                }
                if (data.user) {
                    console.log("应该叫");
                    if (data.user.status !== -1) {
                        console.log("应该叫2");
                        callPerson(callQueue(data.user))
                    }
                }

            } else if (data.siteCall) { // 第一次连接

                let { siteCall, siteUnCall, subscribeCall, subscribeUnCall, urgentCall, urgentUnCall } = data

                updateAList(handleQueues([...subscribeCall, ...subscribeUnCall]))
                updateSList(handleQueues([...siteCall, ...siteUnCall]))
                updateUKist(handleQueues([...urgentCall, ...urgentUnCall]))

                // console.log("现场队列", [...siteCall, ...siteUnCall])
                // console.log("预约队列", [...subscribeCall, ...subscribeUnCall])
                // console.log("加急队列", [...urgentCall, ...urgentUnCall])
            }
        }
        // websocket实例 开启连接
        const call_ws = new createWebSocket(webSocketUrl, getMes);

        return () => {
            QueueSpeaker.cancel()
            // 关闭websocket
            call_ws.close();
            clearTimeout(full_timer.current)
        }

        // eslint-disable-next-line
    }, [])


    // 叫号
    function callPerson(callV) {
        QueueSpeaker.activeSpeak(callV)

    }
    // 处理移动显示全屏icon
    function handleMove() {
        if (full_timer.current) clearTimeout(full_timer.current)
        if (btn_class.search("full-btn-move") === -1) setClass(btn_class + " full-btn-move");
        full_timer.current = setTimeout(() => {
            setClass("full-btn");
        }, 3000)
    }

    // 点击全屏回调
    function fullScreenCallb() {
        updateFSstatues(true)
        console.log(isFullScreen);
    }
    // 退出全屏时回调
    function quitFullScreenCallb() {
        console.log('退出全屏');
        updateFSstatues(isFullScreen)
    }

    return (
        <div style={{ display: 'flex', padding: 10 }} className="queue-container">
            {/* 队列数据 */}
            <div style={{ width: '86%' }}>
                <div className="h_scroll queues" style={{ padding: 10, display: 'flex' }}>
                    <div style={{ boxSizing: 'border-box', width: '34%', paddingRight: '2.1%' }}>
                        <Cqueue isFullScreen={isFullScreen} type="预约" list={appointmentList} />
                    </div>
                    <div style={{ boxSizing: 'border-box', width: '34%', paddingRight: '2.1%' }}>
                        <Cqueue isFullScreen={isFullScreen} type="现场" list={siteList} />
                    </div>
                    <div style={{ boxSizing: 'border-box', width: '32%' }} >
                        <Cqueue isFullScreen={isFullScreen} type="加急" list={uergentList} />
                    </div>
                </div>

            </div>
            {/* 二维码 */}
            <div style={{ width: '14%' }} onMouseMove={handleMove} >
                <div className={btn_class}>
                    <FullBtn ele=".queue-container" enter={fullScreenCallb} quit={quitFullScreenCallb}></FullBtn>
                </div>
                <div className="qr-wrap">
                    <img className="qr-code" src="https://www.rdcmy.com/reservationSystem/QRCode/QRCode.jpg" alt="签到码" />
                    <div className="qr-tip">请扫码签到排队</div>
                </div>
                <div className="alter">
                    <div className="alter_title"><InfoCircleOutlined style={{ fontSize: '2.2vh', color: '#109efc', paddingRight: 11 }} />相关说明</div>
                    <div className="alter_body">请扫码签，选择相应的业务后进行排队！注意排队无法临时取消！如有意外，请联系现场工作人员处理</div>
                </div>
            </div>
        </div>
    )
})
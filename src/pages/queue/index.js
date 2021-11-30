import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import createWebSocket from '@/utils/websocket'
import FullBtn from '@/components/fullBtn'
import Cqueue from '@/components/Cqueue'
import Speaker from '@/utils/Speaker'


export default memo(function Queue(props) {
    // const QueueSpeaker = useRef(new Speaker('zh-CN', 2, 2, 2)).current
    const QueueSpeaker = new Speaker({ lang: 'zh-CN', pitch: 1, rate: 1, volume: 1 }, { endCallb(e) { console.log('end', e) } })
    const full_timer = useRef(null);
    const [btn_class, setClass] = useState("full-btn")
    const [isFullScreen, updateFSstatues] = useState(false)
    useEffect(() => {
        const getMes = (e) => {

            // const { subscribe, site, urgent } = JSON.parse(e.data);
            // const d = JSON.parse(e.data);
            console.log("getMes", JSON.parse(e.data));
            // console.log('进入播放');
            // console.log(d.subscribeUnCall);
        }
        // websocket实例 开启连接
        const call_ws = new createWebSocket('ws://114.132.235.87:8081/queue', getMes);

        return () => {
            QueueSpeaker.cancel()
            // 关闭websocket
            call_ws.close();
            clearTimeout(full_timer.current)
        }

        // eslint-disable-next-line
    }, [])

    // 将传入的字符串里的阿拉伯数字转换成汉语数字
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
    }

    // 叫号
    function callPerson(callV) {
        let text = numToChNum('请工学号3346到2号窗口')
        console.log(text)

        // let text = '请工学号尾号维 四七八七的客户到4号窗口办理业务'
        QueueSpeaker.speak(text)


        // QueueSpeaker.speakMany(['你好','23'], 0)
        // QueueSpeaker.cancel()
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
                        <Cqueue isFullScreen={isFullScreen} type="预约" />
                    </div>
                    <div style={{ boxSizing: 'border-box', width: '34%', paddingRight: '2.1%' }}>
                        <Cqueue isFullScreen={isFullScreen} type="现场" />
                    </div>
                    <div style={{ boxSizing: 'border-box', width: '32%' }} >
                        <Cqueue isFullScreen={isFullScreen} type="加急" />
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
                    <div onClick={() => callPerson()}  className="qr-tip">请扫码签到排队</div>
                </div>
            </div>
        </div>
    )
})

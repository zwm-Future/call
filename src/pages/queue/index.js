import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import createWebSocket from '@/utils/websocket'
import FullBtn from '@/components/fullBtn'
import Cqueue from '@/components/Cqueue'

export default memo(function Queue(props) {
    const full_timer = useRef(null);
    const [btn_class, setClass] = useState("full-btn")
    const [isFullScreen, updateFSstatues] = useState(false)
    useEffect(() => {
        // 语音合成服务
        const synth = window.speechSynthesis;
        // 语音对象
        const msg = new SpeechSynthesisUtterance();
        msg.lang = "zh-CN";  // 使用的语言:中文
        // 监听数据
        const getMes = (e) => {
            
            // const { subscribe, site, urgent } = JSON.parse(e.data);
            // const d = JSON.parse(e.data);
            console.log("getMes", JSON.parse(e.data));
            // console.log('进入播放');
            // console.log(d.subscribeUnCall);
            // handleSpeak(synth, msg, d.subscribeUnCall)
            // }
        }
        // websocket实例 开启连接
        const call_ws = new createWebSocket('ws://114.132.235.87:8081/queue', getMes);

        return () => {
            // 关闭websocket
            call_ws.close();
            //停止播放
            synth.pause();
            // 清除语音队列
            synth.cancel();
            clearTimeout(full_timer.current)
        }

    }, [])

    // 语音合成服务 语音对象 叫号数组
    function handleSpeak(synth, msg, textArr) {
        if (textArr.length > 0) {
            textArr.map(t => {
                // const str = "、" + t.num.slice(t.num.length - 4).split("").join("、");

                // 测试
                const str = t.user.gmtModified.toString()
                const strRead = "、" + str.slice(str.length - 4).split("").join("、");
                msg.text = "请学工号尾号为" + strRead + "到12号窗口办理业务";
                synth.speak(msg);
                synth.speak(msg);
            })
        }
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
                    <div style={{ boxSizing: 'border-box', width: '32.6%' }} >
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
                    <div className="qr-tip">请扫码签到排队</div>
                </div>
            </div>
        </div>
    )
})

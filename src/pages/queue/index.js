import React, { memo, useEffect, useRef, useState } from 'react'
import './index.less'
import createWebSocket from '@/utils/websocket'
import FullBtn from '@/components/fullBtn'
import Qlists from './Qlists'

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
            const { subscribe, site, urgent } = JSON.parse(e.data);
            console.log("getMes",e.data);
            // 全屏下才可播放
            if (isFullScreen) {
                handleSpeak(synth, msg, e.data)
            }
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
                const str = "、" + t.num.slice(t.num.length - 4).split("").join("、");
                msg.text = "请学工号尾号为" + str + "到12号窗口办理业务";
                synth.speak(msg);
                synth.speak(msg);
            })
        }
    }

    // 处理移动显示全屏icon
    function handleMove() {
        if (full_timer.current) clearTimeout(full_timer.current)
        if (btn_class.search("full-btn-move") == -1) setClass(btn_class + " full-btn-move");
        full_timer.current = setTimeout(() => {
            setClass("full-btn");
        }, 3000)
    }

    // 点击全屏回调
    function fullScreenCallb() {
        updateFSstatues(true)
    }
    // 退出全屏时回调
    function quitFullScreenCallb() {
        updateFSstatues(false)
    }

    return (
        <div style={{ display: 'flex', padding: 10 }} className="queue-container">
            <div style={{ width: '86%' }}><Qlists isFullScreen={isFullScreen} /></div>
            {/* 二维码 */}

            <div style={{ width: '14%' }} onMouseMove={handleMove} >
                <div className={btn_class}>
                    <FullBtn ele=".queue-container" enter={fullScreenCallb} quit={quitFullScreenCallb}></FullBtn>
                </div>
                <div className="qr-wrap">
                    <img className="qr-code" src="https://www.rdcmy.com/static/reservationSystem/QRCode/QRCode.jpg" alt="签到码" />
                </div>
            </div>
        </div>
    )
})

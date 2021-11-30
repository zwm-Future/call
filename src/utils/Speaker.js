import { message } from "antd";

// 获取 语音合成
const synth = window.speechSynthesis

class Speaker {

    constructor(config = {}, lifeF) {

        this.msg = new SpeechSynthesisUtterance()

        this.msg.lang = config.lang !== undefined ? config.lang : 'zh-CN'
        this.msg.pitch = config.pitch !== undefined ? config.pitch : 2
        this.msg.rate = config.rate !== undefined ? config.rate : 1.5
        this.msg.volume = config.volume !== undefined ? config.volume : 1

        if (lifeF) {
            this.lifeF = lifeF
            this.msg.onerror = (lifeF.handleError) ? lifeF.handleError : null
            this.msg.onend = (lifeF.endCallb) ? lifeF.endCallb : null
        }
    }

    //  修改声音
    changeMsg(config) {
        if (config) {
            for (const key in config) {
                if (Object.hasOwnProperty.call(config, key)) {
                    this.msg[key] = config[key];
                }
            }
        }
    }

    // 单次
    speak(text) {
        this.msg.text = text
        if (synth.speaking) {
            message.warn('上一呼叫未结束，请稍后')
            return
        }
        synth.speak(this.msg)
    }

    // 多次
    speakMany(arr, index = 0) {
        let i = index
        if (i >= arr.length) {
            this.msg.onend = (this.lifeF && this.lifeF.endCallb) ? this.lifeF.endCallb : null
            return
        }
        if (synth.speaking) {
            message.warn('上一呼叫未结束，请稍后')
            return
        }
        this.msg.text = arr[i++]
        synth.speak(this.msg)

        this.msg.onend = () => {
            this.speakMany(arr, i)
        }
    }

    // 暂停
    pause(callb) {
        synth.pause()
        callb && callb()
    }

    // 恢复
    resume(callb) {
        synth.resume()
        callb && callb()
    }

    // 取消
    cancel(callb) {
        synth.cancel()
        callb && callb()
    }


}

export default Speaker
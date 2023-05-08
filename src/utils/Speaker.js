import { message } from "antd";

/**
 * 叫号接口
 * @class Speaker
 * 
 * config 配置
 * lang 语言
 * pitch 音高
 * rate 速度
 * volume 音量
 */
class Speaker {
  // 获取 语音合成
    static synth = window.speechSynthesis
    constructor(config = {}, lifeF) {

        this.msg = new SpeechSynthesisUtterance()

        this.msg.lang =  config.lang || 'zh-CN'
        this.msg.pitch = config.pitch || 2
        this.msg.rate = config.rate || 1.5
        this.msg.volume = config.volume || 1

        // 文本数组
        this.sentenceList = []

        // 生命函数
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
        Speaker.synth.speak(this.msg)
    }

    // 多次
    speakMany(arr, index = 0) {
        if (index >= arr.length) {
            this.msg.onend = (this.lifeF && this.lifeF.endCallb) ? this.lifeF.endCallb : null
            return
        }

        if (synth.speaking) {
            message.warn('上一呼叫未结束，请稍后')
            return
        }

        this.speak(arr[index++])

        this.msg.onend = () => {
            this.speakMany(arr, index)
        }
    }

    // 多次可动态添加
    activeSpeak(arr) {

        if (arr.length)
            this.sentenceList.push(arr)

        if (this.sentenceList.length <= 0) {
            this.msg.onend = (this.lifeF && this.lifeF.endCallb) ? this.lifeF.endCallb : null
            return
        }

        if (synth.speaking) {
            this.msg.onend = () => {
                this.speak(this.sentenceList.shift())
                this.activeSpeak([])
            }
        }
        else {
            this.speak(this.sentenceList.shift())
            this.msg.onend = () => {
                this.activeSpeak([])
            }
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
        console.log("关闭叫号");
        synth.cancel()
        this.sentenceList = ['']
        callb && callb()
    }


}

export default Speaker
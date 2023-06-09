import React, { useState,useEffect } from 'react'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
// import { useEffect } from 'react/cjs/react.development';

/* 
保证在同一个更新/卸载组件下使用
*/
class fullScreen {
    /**
     * @description: 全屏初始化
     * @param {Function} fn 用户浏览器不支持全屏的回调
     */
    constructor(fn) {
        this.prefixName = ""; // 浏览器前缀
        this.isFullscreenData = true; // 浏览器是否支持全屏
        this.force = false; //在全屏时判断是否强制跳转，是则不进行quit和enter回调，以免组件卸载继续更新
        this.isFullscreen(fn);
    }
    /**
     * @description: 将传进来的元素全屏
     * @param {String} domName 要全屏的dom名称
     */
    Fullscreen(domName) {
        const element = document.querySelector(domName);
        const methodName =
            this.prefixName === ""
                ? "requestFullscreen"
                : `${this.prefixName}RequestFullScreen`;
        console.log(element[methodName]);
        element[methodName]();
    }
    // 退出全屏
    exitFullscreen() {
        const methodName =
            this.prefixName === ""
                ? "exitFullscreen"
                : `${this.prefixName}ExitFullscreen`;
        document[methodName]();
    }
    /**
     * @description: 监听进入/离开全屏
     * @param {Function} enter 进入全屏的回调
     *  @param {Function} quit 离开全屏的回调
     */
    screenChange(enter, quit) {
        if (!this.isFullscreenData) return;
        const methodName = `on${this.prefixName}fullscreenchange`;
        document[methodName] = e => {
            if (this.isElementFullScreen() && !this.force) {
                enter && enter(e); // 进入全屏回调
            } else if (!this.force) {
                quit && quit(e); // 离开全屏的回调
            }
        };
    }
    /**
     * @description: 浏览器无法进入全屏时触发,可能是技术原因，也可能是用户拒绝：比如全屏请求不是在事件处理函数中调用,会在这里拦截到错误
     * @param {Function} enterErrorFn 回调
     */
    screenError(enterErrorFn) {
        const methodName = `on${this.prefixName}fullscreenerror`;
        document[methodName] = e => {
            enterErrorFn && enterErrorFn(e);
        };
    }
    /**
     * @description: 是否支持全屏+判断浏览器前缀
     * @param {Function} fn 不支持全屏的回调函数 这里设了一个默认值
     */
    isFullscreen(fn) {
        let fullscreenEnabled;
        // 判断浏览器前缀
        if (document.fullscreenEnabled) {
            fullscreenEnabled = document.fullscreenEnabled;
        } else if (document.webkitFullscreenEnabled) {
            fullscreenEnabled = document.webkitFullscreenEnabled;
            this.prefixName = "webkit";
        } else if (document.mozFullScreenEnabled) {
            fullscreenEnabled = document.mozFullScreenEnabled;
            this.prefixName = "moz";
        } else if (document.msFullscreenEnabled) {
            fullscreenEnabled = document.msFullscreenEnabled;
            this.prefixName = "ms";
        }
        if (!fullscreenEnabled) {
            this.isFullscreenData = false;
            fn && fn(); // 执行不支持全屏的回调
        }
    }
    /**
     * @description: 检测有没有元素处于全屏状态
     * @return 布尔值
     */
    isElementFullScreen() {
        const fullscreenElement =
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;
        if (fullscreenElement === null || fullscreenElement === undefined) {
            return false; // 当前没有元素在全屏状态
        } else {
            return true; // 有元素在全屏状态
        }
    }
}
let full = new fullScreen(() => {
    message.warning("你的浏览器貌似不支持全屏")
});
full.screenError(e => {
    message.warning("全屏失败")
});
export default function FullBtn(props) {
    const [icon, switchIcon] = useState((<FullscreenOutlined style={{ fontSize: '2.5vw', color: '#000' }} />))
    useEffect(() => {
        if (props.enter && props.quit) {
            full.screenChange(props.enter, props.quit)
        }
        return () => { full.force = true }
        // eslint-disable-next-line 
    }, [])

    function hanleClick() {
        if (full.isElementFullScreen()) {
            full.exitFullscreen();
            switchIcon((<FullscreenOutlined style={{ fontSize: '2.5vw', color: '#000' }} />))
            return
        }
        full.Fullscreen(props.ele);
        switchIcon(<FullscreenExitOutlined style={{ fontSize: '2.5vw', color: '#000' }} />)
    }
    return (
        <Button icon={icon} onClick={hanleClick} style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#ccc' }}></Button>
    )
}


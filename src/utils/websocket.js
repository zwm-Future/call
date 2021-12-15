import { message, notification, Button } from 'antd'

// 关闭连接回调
function openNoti() {
    notification.error({
        description: "连接已断开!可刷新重新连接",
        duration: 0,
        key: 'key',
        btn: (
            <Button type="primary" size="small" onClick={() => { window.location.reload(true); notification.close("key") }}>
                刷新
            </Button>
        ),

    })
}

class createWebSocket {
    // ws 地址  url, 接受信息回调 getMes
    constructor(url, getMes) {
        this.myUrl = url
        // 开启标识

        this.socket_open = false
        // 心跳timer
        this.hearbeat_timer = null
        // 心跳发送频率
        this.hearbeat_interval = 30000

        // 是否自动重连
        this.is_reonnect = true
        // 重连次数
        this.reconnect_count = NaN
        // 已发起重连次数
        this.reconnect_current = 1
        // 重连timer
        this.reconnect_timer = null
        // 重连频率
        this.reconnect_interval = 3000
        this.getMessage = getMes
        this.connect(url)

    }

    connect(url) {//连接服务器

        this.ws = new WebSocket(url)

        this.ws.onopen = (e) => {
            this.status = 'open'
            message.info('连接成功')
            console.log("connection to server is opened")
            this.socket_open = true;
            this.is_reonnect = true;
            this.reconnect_current = 1;
            // 开启心跳
            this.heartbeat();
            notification.close("key")

        }
        this.ws.onmessage = (e) => {
            this.heartbeat();
            this.getMessage(e);
        }
        // 关闭回调
        this.ws.onclose = (e) => {
            console.log('连接已断开')
            openNoti()
            console.log('connection closed (' + e.code + ')')
            clearInterval(this.hearbeat_timer)
            this.socket_open = false

            // 需要重新连接
            if (this.is_reonnect) {
                this.reconnect_timer = setTimeout(() => {
                    // 超过重连次数
                    if (this.reconnect_current > this.reconnect_count) {
                        clearTimeout(this.reconnect_timer)
                        return
                    }
                    // 记录重连次数
                    this.reconnect_current++
                    this.reconnect()
                }, this.reconnect_interval)
            }
        }
        // 连接发生错误
        this.ws.onerror = () => {
            console.log('WebSocket连接发生错误')
        }
    }

    // 心跳
    heartbeat = () => {
        if (this.hearbeat_timer) {
            clearInterval(this.hearbeat_timer)
        }

        this.hearbeat_timer = setInterval(() => {
            this.send('Ping');
        }, this.hearbeat_interval)
    }

    // 发送数据
    send = (data, callback = null) => {
        // 开启状态直接发送
        if (this.ws.readyState === this.ws.OPEN) {
            this.ws.send(JSON.stringify(data))

            if (callback) {
                callback()
            }

            // 正在开启状态，则等待1s后重新调用
        } else if (this.ws.readyState === this.ws.CONNECTING) {
            setTimeout(function () {
                this.send(data, callback)
            }, 1000)

            // 未开启，则等待1s后重新调用
        } else {
            this.connect(this.myUrl);
            setTimeout(function () {
                this.send(data, callback)
            }, 1000)
        }
    }
    // 重连
    reconnect() {
        console.log('发起重新连接', this.reconnect_current)

        if (this.ws && this.socket_open) {
            this.ws.close()
        }

        this.connect(this.myUrl);
    }

    // 关闭
    close() {
        console.log('主动断开连接')
        notification.close('key')
        clearInterval(this.hearbeat_timer)
        this.is_reonnect = false
        this.ws.close()
    }
}
export default createWebSocket

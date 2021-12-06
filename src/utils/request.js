import axios from 'axios'
import { notification } from 'antd'
const baseURL = "http://114.132.235.87/"

export default function request(option) {
    return new Promise((resolve, reject) => {

        const services = axios.create({
            baseURL,
            timeout: 10000
        });

        // 请求拦截
        services.interceptors.request.use(config => {
            // console.log('来到了request拦截success中');
            // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

            // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

            // 3.对请求的参数进行序列化(看服务器是否需要序列化)
            // config.data = qs.stringify(config.data)
            // console.log(config);
            const token = localStorage.getItem("authed");
            if (token) config.headers.token = token;
            return config
        }, err => {
            // console.log('来到了request拦截failure中');
            return err
        })
        // 响应拦截
        services.interceptors.response.use(response => {
            return response.data
        }, err => {
            if (err && err.response) {
                switch (err.response.status) {
                    case 400:
                        err.message = '请求错误'
                        break
                    case 401:
                        notification.error({
                            message: '登录超时，请重新登录！',
                        });
                        //删除本地token
                        localStorage.removeItem("authed");
                        window.history.go('/login');
                        // err.message = '未授权的访问'
                        break
                    default:
                        err.message = "其他错误信息"
                }
            }
            return err
        })

        // 2.传入对象进行网络请求
        services(option).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
import axios from 'axios'

const BASEURL = "";

const service = axios.create({
    baseURL: BASEURL,
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        // token
        return config;
    },
    error => {
        return new Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data;
        if(res === undefined) return res;
        if(res.statsu == 1) {
            // Message({
            //     //请求错误
            // })
            return new Promise.reject(res.message || 'error');
        }else {
            return res;
        }
    }
)
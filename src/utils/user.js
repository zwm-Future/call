import { notification } from 'antd'

export const saveWorker = (worker) => {
    localStorage.setItem("worker",worker);
}
export const getWorker = () => {
    const worker = localStorage.getItem("worker");
    if(worker && worker.id) {
        return worker;
    }else {
        notification.error({
            message: '登录超时，请重新登录！',
        });
        //删除本地token
        localStorage.removeItem("authed");
        window.history.go('/login');
    }
}
export const removeWorker = () => {
    localStorage.removeItem("worker");
}
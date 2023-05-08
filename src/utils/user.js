export const saveWorker = (worker) => {
    localStorage.setItem("worker", worker);
}
export const getWorker = () => {
    let worker = localStorage.getItem("worker");
    worker = JSON.parse(worker);
    if(worker && worker.id) {
        return worker;
    } else {
        removeWorker();
        return {}
    }
}
export const removeWorker = () => {
    localStorage.removeItem("worker");
}
import { memo, useState, useEffect } from 'react'
import './queue.css'
import { SyncOutlined } from '@ant-design/icons';
import { Table } from 'antd';
const columns = [{
    // key:'index',
    title: "序号",
    dataIndex: 'index',
    width: 50
}, {
    // key:'name',
    title: "姓名",
    dataIndex: 'name',
    width: 100
}]
const data = [
    {
        key: '1',
        index: 1,
        name: 'Jack'
    },
    {
        key: '2',
        index: 2,
        name: 'Mary'
    },
    {
        key: '3',
        index: 3,
        name: 'Hellow'
    },
    {

        key: '4',
        index: 4,
        name: 'JavaScript'
    },
    {
        key: '5',
        index: 5,
        name: 'Python'
    },
    {
        key: '6',
        index: 3,
        name: 'Hellow'
    },
    {
        key: '7',
        index: 4,
        name: 'JavaScript'
    },
    {
        key: '8',
        index: 3,
        name: 'Hellow'
    },
    {
        key: '9',
        index: 4,
        name: 'JavaScript'
    },
    {
        key: '8',
        index: 3,
        name: 'Hellow'
    },
    {
        key: '9',
        index: 4,
        name: 'JavaScript'
    },
    {
        key: '8',
        index: 3,
        name: 'Hellow'
    },
    {
        key: '9',
        index: 4,
        name: 'JavaScript'
    }]


export default memo(function Queue(props) {
    let [isSpin, Spin] = useState(false)
    let loadingQueue = () => {
        Spin(true)
        setTimeout(() => {
            Spin(false)
        }, 2000)
    }
    console.log('queue', props);
    return (
        <div className="h_queue">
            <div className="queue_header"><div>当前排队信息</div><SyncOutlined onClick={() => loadingQueue()} spin={isSpin} style={{ color: "#68656a" }} /></div>
            <Table scroll={{ y: 615 }} pagination={false} columns={columns} dataSource={data} />
        </div>
    )
})
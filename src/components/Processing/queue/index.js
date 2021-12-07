import { memo, useState } from 'react'
import './queue.less'
import { SyncOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Table, Button, Modal } from 'antd';
const { Column } = Table;

export default memo(function Queue(props) {
    let [isSpin, Spin] = useState(false)
    function loadingQueue() {
        Spin(true)
        props.getQueueData()
        setTimeout(() => {
            Spin(false)
        }, 1000)
    }
    function showModal(id, key) {
        console.log("ID", id)
        setTimeout(() => {
            Modal.confirm({
                title: '是否手动处理',
                icon: <ExclamationCircleOutlined />,
                content: "排队序号:" + key,
                okText: '确认',
                cancelText: '取消',
                onOk: () => props.mannualHandle(id)
            });
        }, 0);
    }

    console.log('queue', props);
    return (
        <div className="h_queue h_scroll" >
            <div className="queue_header"><div>当前排队信息</div><SyncOutlined onClick={() => loadingQueue()} spin={isSpin} style={{ color: "#68656a" }} /></div>
            <Table
                scroll={{ y: 550 }}
                pagination={false}
                bordered
                dataSource={props.list}>
                <Column title="排队号" dataIndex="key" />
                <Column title="姓名" dataIndex="name" />
                <Column title="操作" dataIndex="action"
                    render={(_, data) => {
                        return (
                            <Button type="error" onClick={() => showModal(data.id, data.key)} ghost style={{ borderColor: 'orange', color: 'orange', marginRight: 12 }}>手动处理</Button>
                        )
                    }}
                />
            </Table>
            <Modal />
        </div>
    )
})
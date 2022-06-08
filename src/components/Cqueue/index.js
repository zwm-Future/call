import { memo } from 'react'
import { Table } from 'antd'
import './Cqueue.less'

let columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        // key: 'name',
        width: '35%'
    },
    {
        title: '排队序号',
        dataIndex: 'key',
        // key: 'number',
        width: '40%'
    },
    {
        title: '窗口',
        dataIndex: 'windowNum',
        // key: 'windowNum',
        width: '25%'
    }
]


export default memo(function Cqueue(props) {
    // console.log('是否全屏', props.isFullScreen)
    // console.log('ListInfo', props.list)
    return (
        <div className="queue_con" >
            <div className="header" >
                <div className="title" >{props.type}队列</div>
                <div className="total" >共（{props.list.length}）人</div>
            </div>
            {/* <Table
                bordered pagination={false}
                columns={columns} dataSource={props.list} /> */}
            <Table
                scroll={props.list.length > 0 ? { y: props.isFullScreen ? '87vh' : '69vh' } : {}}
                bordered pagination={false}
                columns={columns} dataSource={props.list} />
        </div>
    )
})

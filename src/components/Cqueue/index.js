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
        dataIndex: 'number',
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

// let dataSource = []
// for (let i = 1; i <= 23; i++) {
//     let status = i <= 5 ? i : 0
//     dataSource.push({
//         name: 'Jack' + i,
//         number: 'am-' + i,
//         key: i,
//         windowNum: (<div style={{ textAlign: 'center', color: status ? 'red' : '#000', fontWeight: status ? 'bold' : 'normal' }} > {status ? status : '待定'}</ div>)
//     })
// }

export default memo(function Cqueue(props) {
    // console.log('是否全屏', props.isFullScreen)
    console.log('ListInfo', props.list)
    return (
        <div className="queue_con" >
            <div className="header" >
                <div className="title" >{props.type}队列</div>
                <div className="total" >共（{props.list.length}）人</div>
            </div>
            <Table
                scroll={{
                    y: props.isFullScreen ? '87vh' : '71vh'
                }}
                bordered pagination={false}
                columns={columns} dataSource={props.list} />
        </div>
    )
})
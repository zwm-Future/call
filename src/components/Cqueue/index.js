import { memo } from 'react'
import { Table } from 'antd'
import './Cqueue.less'

let columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '35%'
    },
    {
        title: '工学号',
        dataIndex: 'id',
        key: 'id',
        width: '40%'
    },
    {
        title: '窗口',
        dataIndex: 'windowNum',
        key: 'windowNum',
        width: '25%'
    }
]

let dataSource = []
for (let i = 1; i <= 23; i++) {
    let status = i <= 5 ? i : 0
    let num = Math.round(Math.random() * (9000))
    num = num > 1000 ? num : num + 1000
    dataSource.push({
        name: 'Jack' + i,
        id: '******' + num,
        key: i,
        windowNum: (<div style={{ textAlign: 'center', color: status ? 'red' : '#000' }} > {status ? status : '待定'}</ div>)
    })
}

export default memo(function Cqueue(props) {
    console.log('Cqueue', props.isFullScreen);
    console.log('是否全屏', props.isFullScreen)
    return (
        <div className="queue_con" >
            <div className="header" >
                <div className="title" >{props.type}队列</div>
                <div className="total" >共（{dataSource.length}）人</div>
            </div>
            <Table
                scroll={{
                    y: props.isFullScreen ? '87vh' : '74vh'
                }}
                bordered pagination={false}
                columns={columns} dataSource={dataSource} />
        </div>
    )
})
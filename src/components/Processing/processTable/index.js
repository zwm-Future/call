import { memo, useState, useEffect } from 'react'
import './processTable.less'
import { Table, Button } from 'antd';
const { Column } = Table;

export default memo(function ProcessTable(props) {

    let [isLoading, switchLoading] = useState(false)
    let [processInfo, updateProcessInfo] = useState({})  // 当前处理的信息

    useEffect(() => {
        console.log('process-table', props);
        if (props.isMannual)
            updateProcessInfo({ ...props.MannualPersonInfo })
        else
            updateProcessInfo({ ...props.personInfo })
        // switchMannul(props.isMannual)

        return () => {
        }
        // eslint-disable-next-line
    }, [props.personInfo, props.isMannual])


    // 点击叫号 
    function handleCall() {
        switchLoading(true)
        props.callNext()
        setTimeout(() => {
            switchLoading(false)
        }, 1000);

    }


    return (
        <div className="h_pro_table">
            <div className="customer_info" style={{
                marginTop: processInfo.appointments ? '0' : '100px'
            }}>
                <div>
                    <div className="item"> <div className="lable">当前客户</div>：{processInfo.name} </div>
                    <div className="item"> <div className="lable">工学号</div>：{processInfo.id}</div>
                    <div className="item"> <div className="lable">排队序号</div>：{processInfo.number}</div>
                </div>
            </div>
            <div className="h_scroll" style={{
                display: processInfo.appointments ? 'block' : 'none'
            }}>
                <div className="list_title">总单数 ( {processInfo.appointments ? processInfo.appointments.length : 0} )：</div>
                <Table
                    scroll={{ y: 310 }}
                    bordered
                    pagination={false}
                    dataSource={processInfo.appointments}
                >
                    <Column title="单号" dataIndex="key" width='50%' />
                </Table>
            </div>
            <div className="btn_list">
                {
                    (processInfo.name === "无数据") ? (<Button onClick={() => handleCall()} loading={isLoading} type="primary" size="large" >呼叫用户</Button>) :
                        (<>
                            <Button type="primary" ghost style={{ borderColor: 'orange', color: 'orange' }} size="large" onClick={() => props.handleDelay(processInfo)}>未到</Button>
                            <Button onClick={() => props.callNext()} type="primary" size="large" >下一位</Button>
                        </>)
                }
            </div>
        </div >
    )
})
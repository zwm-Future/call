import { memo, useState, useEffect } from 'react'
import './processTable.less'
import { WrappedTextarea } from './style'
import { Table, Button, Modal, notification, Input, message } from 'antd';
const { TextArea } = Input;
const { Column } = Table;

export default memo(function ProcessTable(props) {

    let [list, updateList] = useState([])
    let [selectedListKey, updateSelectedList] = useState([])   // 被选中的数据的 key
    let [isshowFeedback, switchShowFeedback] = useState(false)  // 是否显示反馈框
    let [reason, updateReason] = useState('')   // 未通过原因
    // let [isMannual, switchMannul] = useState(false)      // 是否手动处理状态
    let [processInfo, updateProcessInfo] = useState({})  // 当前处理的信息
    // let [MannualInfo, updateMannualInfo] = useState({})     // 手动处理信息

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



    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            updateSelectedList(selectedRowKeys)
            console.log(selectedRowKeys, selectedRows)
        },
        // getCheckboxProps: (record) => {
        //     // record 是没条数据的数据。
        //     // 对每个 checkbox 的配置。
        //     console.log(record);
        //     console.log('AAAAABABA');
        //     return ({
        //         // Column configuration not to be checked
        //         name: record.name,
        //     })
        // },
    };

    let handleList = (key, htype) => {
        if (htype === 'sccuess') {
            let newList = list.filter(v => {
                if (v.key === key) return false
                return true
            })
            updateList(newList)
            // 处理成功删除，处理失败弹窗报错
            notification['error']({
                message: '未知错误',
                description:
                    '请重试',
            });
            return
        }
        updateSelectedList([key])
        // selectedListKey.push = key
        switchShowFeedback(true);
    }

    const handleOk = () => {

        switchShowFeedback(false);

        let selectedList = []
        selectedListKey.forEach(v => {
            list.forEach(v2 => {
                if (v2.key === v) {
                    selectedList.push(v2)
                }
            })
        })

        setTimeout(() => {
            console.log('未处理原因', reason);
            console.log('未处理单号', selectedList);
            console.log('发送请求');
            console.log('请求成功 ，删除数据');
            updateReason('')
            console.log(selectedListKey);

            let newList = list
            selectedListKey.forEach(v => {
                newList = newList.filter(v2 => {
                    if (v2.key === v) return false
                    return true
                })
            })

            console.log(newList);
            updateList(newList)
        }, 1000)

        // console.log('selectedList', selectedList);
    };

    const handleCancel = () => {
        switchShowFeedback(false);
    };

    // const handledMany = () => {
    //     if (selectedListKey.length === 0) {
    //         message.warning('默认全选');
    //         return
    //     }
    //     let selectedList = []
    //     selectedListKey.forEach(v => {
    //         list.forEach(v2 => {
    //             if (v2.key === v) {
    //                 selectedList.push(v2)
    //             }
    //         })
    //     })

    //     setTimeout(() => {
    //         console.log('已处理单号', selectedList);
    //         console.log('发送请求');
    //         console.log('请求成功 ，删除数据');
    //         console.log(selectedListKey);

    //         let newList = list
    //         selectedListKey.forEach(v => {
    //             newList = newList.filter(v2 => {
    //                 if (v2.key === v) return false
    //                 return true
    //             })
    //         })

    //         console.log(newList);
    //         updateList(newList)
    //     }, 1000)
    // }


    return (
        <div className="h_pro_table">
            <div className="customer_info" style={{
                marginTop: processInfo.appointments ? '0' : '100px'
            }}>
                <div>
                    <div className="item"> 当前客户 ： {processInfo.name} </div>
                    <div className="item"> 工学号：{processInfo.id}</div>
                    <div className="item"> 排队序号：{processInfo.number}</div>
                </div>
            </div>
            <div className="h_scroll" style={{
                display: processInfo.appointments ? 'block' : 'none'
            }}>
                <div className="list_title">总单数 ( {list.length} )：</div>
                <Table
                    scroll={{ y: 300 }}
                    bordered
                    pagination={false}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={processInfo.appointments}
                >
                    <Column title="单号" dataIndex="key" width='50%' />
                    <Column title="操作" dataIndex="action" width='50%'
                        render={(text, record) => {
                            // console.log('record', record.id);
                            return (
                                <div>
                                    <Button type="primary" onClick={() => handleList(record.key, 'fail')} ghost style={{ borderColor: 'orange', color: 'orange', marginRight: 12 }}>未处理</Button>
                                    <Button type="primary" onClick={() => handleList(record.key, 'sccuess')}>已处理</Button>
                                </div>
                            )
                        }}
                    />
                </Table>
            </div>
            {/* <input > */}
            <div className="btn_list">
                {
                    (processInfo.name === "无数据") ? (<Button onClick={() => props.callNext(processInfo.id)} type="primary" size="large" >呼叫用户</Button>) :
                        (<>
                            <Button type="primary" ghost style={{ borderColor: 'orange', color: 'orange' }} size="large" onClick={() => props.handleDelay(processInfo.id)}>未到</Button>
                            <Button onClick={() => props.callNext(processInfo.id)} type="primary" size="large" >下一位</Button>
                        </>)
                }

            </div>
            <Modal
                okText="确认"
                cancelText="取消"
                centered
                title={<div style={{ fontSize: 22 }}>未处理原因</div>} visible={isshowFeedback} onOk={handleOk} onCancel={handleCancel}>
                <WrappedTextarea>
                    <TextArea
                        autoFocus
                        style={{ height: 100 }} value={reason} onInput={(e) => updateReason(e.target.value)} />
                </WrappedTextarea>
            </Modal>
        </div >
    )
})
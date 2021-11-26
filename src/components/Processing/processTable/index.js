import { memo, useState, useEffect } from 'react'
import './processTable.css'
import { WrappedTextarea } from './style'
import { Table, Button, Modal, notification, Input } from 'antd';
const { TextArea } = Input;
const { Column } = Table;


const data = [
    {
        key: '1',
        id: '111'
    },
    {
        key: '2',
        id: '222'
    }, {
        key: '3',
        id: '333'
    },
    {
        key: '4',
        id: '444'
    },
    {
        key: '5',
        id: '555'
    }, {
        key: '6',
        id: '666'
    }, {
        key: '7',
        id: '777'
    },
    {
        key: '8',
        id: '888'
    }, {
        key: '9',
        id: '999'
    }
]
export default memo(function ProcessTable(props) {
    useEffect(() => {
        console.log('process-table', props);
    })

    let [list, updateList] = useState(data)
    let [selectedListKey, updateSelectedList] = useState([])
    let [isshowFeedback, switchShowFeedback] = useState(false)
    let [reason, updateReason] = useState('')

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

    const handledMany = () => {
        let selectedList = []
        selectedListKey.forEach(v => {
            list.forEach(v2 => {
                if (v2.key === v) {
                    selectedList.push(v2)
                }
            })
        })

        setTimeout(() => {
            console.log('已处理单号', selectedList);
            console.log('发送请求');
            console.log('请求成功 ，删除数据');
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
    }
    return (
        <div className="h_pro_table">
            <div className="customer_info">
                <div> 当前客户 ： XXX </div>
                <div> 工学号：1230004949</div>
            </div>
            <div className="h_scroll">
                <div style={{
                    margin: '30px 0 10px 0',
                    fontSize: 20
                }}>总单数 ( {list.length} )：</div>
                <Table
                    scroll={{ y: 420 }}
                    bordered
                    pagination={false}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={list}
                >
                    <Column title="单号" dataIndex="id" width='50%' />
                    <Column title="操作" dataIndex="action" width='50%'
                        render={(text, record) => {
                            // console.log('record', record.id);
                            return (
                                <div style={{ display: 'flex' }}>
                                    <Button type="primary" onClick={() => handleList(record.key, 'fail')} ghost style={{ borderColor: 'orange', color: 'orange' }}>未处理</Button>&nbsp;&nbsp;
                                    <Button type="primary" onClick={() => handleList(record.key, 'sccuess')}>已处理</Button>
                                </div>
                            )
                        }}
                    />
                </Table>
            </div>
            {/* <input > */}
            <div style={{ display: 'flex' }} className="btn_list">
                <div style={{
                    flex: 1
                }}></div>
                <div style={{
                    flex: 1,
                    display: 'flex'
                }}>
                    <Button onClick={() => switchShowFeedback(true)} type="primary" size="large" ghost style={{ borderColor: 'orange', color: 'orange' }}>批量未处理</Button>&nbsp;&nbsp;
                    <Button onClick={() => handledMany()} type="primary" size="large" >批量已处理</Button>
                </div>
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
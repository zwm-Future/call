import { memo, useState, useEffect } from 'react'
import './processTable.css'

import { Table, Button } from 'antd';
const { Column } = Table;

const data = [
    {
        key: '1',
        id: '31233212341'
    },
    {
        key: '2',
        id: '831233234123411'
    }, {
        key: '3',
        id: '75234212341'
    },
    {
        key: '1',
        id: '31233212341'
    },
    {
        key: '2',
        id: '831233234123411'
    }, {
        key: '3',
        id: '75234212341'
    }, {
        key: '1',
        id: '31233212341'
    },
    {
        key: '2',
        id: '831233234123411'
    }, {
        key: '3',
        id: '75234212341'
    }
]
export default memo(function Header(props) {
    console.log('process-table', props);
    let [list, updateList] = useState(data)

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(selectedRowKeys, selectedRows)
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        console.log('删除', key);
        let newList = list.filter(v => {
            if (v.key === key) return false
            return true
        })
        updateList(newList)
        // console.log(newList);
    }

    return (
        <div className="h_pro_table">
            <div className="customer_info">
                <div> 当前客户 ： XXX </div>
                <div> 工学号：1230004949</div>
            </div>
            <div>
                <div style={{
                    margin: '30px 0 10px 0',
                    fontSize: 20
                }}>总单数 ( 5 )：</div>
                <Table
                    scroll={{ y: 415 }}
                    pagination={false}
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    dataSource={list}
                >
                    <Column title="单号" dataIndex="id" width='450' />
                    <Column title="操作" dataIndex="action" width='450'
                        render={(text, record) => {
                            // console.log('record', record.id);
                            return (
                                <div style={{ display: 'flex' }}>
                                    <Button type="primary" onClick={() => handleList(record.key, false)} ghost style={{ borderColor: 'orange', color: 'orange' }}>未处理</Button>&nbsp;&nbsp;
                                    <Button type="primary" onClick={() => handleList(record.key, true)}>已处理</Button>
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
                    <Button type="primary" size="large" ghost style={{ borderColor: 'orange', color: 'orange' }}>批量未处理</Button>&nbsp;&nbsp;
                    <Button type="primary" size="large" >批量已处理</Button>
                </div>

            </div>
        </div>
    )
})
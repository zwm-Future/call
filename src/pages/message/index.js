import React, { memo, useState } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
const { Option } = Select;


const dataSource = [
    {
        key: '1',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '2',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '3',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '4',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '5',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '6',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '7',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '8',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '9',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '10',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '11',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '12',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
    {
        key: '13',
        num: '1234567890',
        name: '胡彦斌',
        stuNum: '3120004860',
        contact: '13430017068',
        orderPerson: 'xxx'
    },
];

const columns = [
    {
        title: '序号',
        dataIndex: 'index',
        render: (_, data, index) => index + 1
    }
    ,
    {
        title: '单号',
        dataIndex: 'num',
    },
    {
        title: '姓名',
        dataIndex: 'name'
    },
    {
        title: '学工号',
        dataIndex: 'stuNum'
    },
    {
        title: '联系方式',
        dataIndex: 'contact'
    },
    {
        title: '审核人员',
        dataIndex: 'orderPerson',
    },
]
export default memo(function Message(props) {
    const [searchType, setSearchType] = useState('num');
    const [searchName, setSearchName] = useState("");

    const updateSearchType = (value) => {
        setSearchType(value);
    }
    const updateSearchName = (e) => {
        setSearchName(e.target.value)
    }
    const searchOrder = () => {
        if(searchName == "") {
            message.warning('请输入内容！');
            return;
        }
        //请求数据
    }
    const title = (
        <span>
            <Select value={searchType} style={{ width: 150 }} onChange={updateSearchType}>
                <Option value='num'>按单号搜索</Option>
                <Option value='name'>按名字搜索</Option>
                <Option value='stuNum'>按学工号搜索</Option>
            </Select>
            <Input placeholder='输入关键字' style={{ width: 250, margin: '0 15px' }} onChange={updateSearchName}></Input>
            <Button type='primary' onClick={searchOrder} >搜索</Button>
        </span>
    )
    return (
        <div className="message-wrap" style={{ height: '100%' }}>
            <Card title={title}
                style={{ height: '100%' }}
                bordered >
                <Table
                    bordered
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="_id"
                >
                </Table>
            </Card>
        </div>
    )
})

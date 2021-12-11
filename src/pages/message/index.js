import React, { memo, useState, useEffect } from 'react'
import { Card, Select, Input, Button, Table, message } from 'antd'
import { getMessage } from '@/api/search'
const { Option } = Select;

//默认第1页，条数10
const PAGE = 1, PAGESIZE = 10;
let searchContext = "", searchType = "";
export default memo(function Message(props) {
    //当前输入框搜索类型
    const [currentType, setCurrentType] = useState('default');
    // 当前输入框搜索内容
    const [currentContext, setCurrentContext] = useState("");
    //当前信息
    const [mes, setMes] = useState([]);
    //当前第n页
    const [page, setPage] = useState(PAGE);
    //总数
    const [total, setTotal] = useState(PAGESIZE);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        defaultSearch();
        return () => {
        }
    }, [])

    //更新当前输入框搜索类型
    const updateSearchType = (value) => {
        setCurrentType(value);
    }
    //更新当前输入框搜索内容
    const updateSearchContext = (e) => {
        setCurrentContext(e.target.value)
    }

    // 过滤搜索
    const filterSearch = () => {
        if (currentType == 'default') return true;
        if (currentContext == "") {
            message.warning("请输入有效内容");
            return false;
        }
        const isNum = /^[0-9]*$/;
        const isCN = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (currentType == "workerName") {
            if (isCN.test(currentContext)) return { [currentType]: currentContext };
            else message.warning("请输入有效内容"); return false;
        } else if (currentType == "orderNumber" || "userNumber") {
            if (isNum.test(currentContext)) return { [currentType]: currentContext };
            else message.warning("请输入有效内容"); return false;
        }
    }

    //获取并渲染
    const getMes = (dataObj) => {
        setLoading(true);
        getMessage(dataObj).then(res => {
            const { data: { records, total }, code } = res;
            if (code == 0) {
                setTotal(total);
                setMes(records);
            } else {
                message.warning('请求异常')
            }
            setLoading(false);
        })
    }

    //默认
    const defaultSearch = () => {
        getMes({ page: PAGE, size: PAGESIZE })
    }

    //按类型搜索
    const searchOrder = () => {
        const type = filterSearch();
        if (type) {
            searchContext = currentContext;
            searchType = currentType;
            setPage(PAGE);
            if (searchType == "default") defaultSearch();
            else getMes({ ...type, page: PAGE, size: PAGESIZE })
        }
    }
    //更新第n页信息
    const updateCurrent = (page, pageSize) => {
        setPage(page);
        if (searchType != "default" && searchContext) getMes({ [searchType]: searchContext, page, size: pageSize });
        else getMes({ page, size: pageSize });
    }
    const title = (
        <span>
            <Select value={currentType} style={{ width: 150 }} onChange={updateSearchType}>
                <Option value='default'>默认搜索</Option>
                <Option value='orderNumber'>按单号搜索</Option>
                <Option value='userNumber'>按学工号搜索</Option>
                <Option value='workerName'>按审核人员搜索</Option>
            </Select>
            <Input placeholder='输入关键字' disabled={currentType == "default" ? true : false} style={{ width: 250, margin: '0 15px' }} onChange={updateSearchContext}></Input>
            <Button disabled={loading} type='primary' onClick={searchOrder} >搜索</Button>
        </span>
    )
    //列信息
    const columns = [
        {
            key: 'index',
            width: 100,
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            render: (_, data, index) => (page - 1) * 10 + index + 1
        }
        ,
        {
            key: 'orderNumber',
            width: 300,
            title: '单号',
            align: 'center',
            dataIndex: 'orderNumber',
        },
        {
            key: 'id',
            width: 200,
            title: '姓名',
            align: 'center',
            dataIndex: 'id'
        },
        {
            key: 'userId',
            width: 300,
            title: '学工号',
            align: 'center',
            dataIndex: 'userId'
        },
        {
            key: 'workerName',
            width: 200,
            title: '审核人员',
            align: 'center',
            dataIndex: 'workerName',
        },
        {
            key: 'day',
            width: 200,
            title: '处理时间',
            align: 'center',
            dataIndex: 'day'
        },
    ]
    return (
        <div className="message-wrap" style={{ height: '100%' }}>
            <Card title={title}
                style={{ height: '100%' }}
                bordered >
                <Table
                    bordered
                    columns={columns}
                    dataSource={mes}
                    pagination={
                        {
                            total,
                            current: page,
                            pageSize: PAGESIZE,
                            showSizeChanger: false,
                            onChange: updateCurrent
                        }
                    }
                    loading={loading}
                    // dataSource={dataSource}
                    rowKey="_id"
                >
                </Table>
            </Card>
        </div>
    )
})

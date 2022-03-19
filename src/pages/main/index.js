import React, { memo, useState, useEffect } from 'react'
import qs from 'qs'
import { useHistory } from 'react-router-dom'
import {
    SafetyCertificateTwoTone,
    EnvironmentTwoTone,
    ThunderboltTwoTone,
    UserOutlined,
    EditTwoTone
} from '@ant-design/icons'

import { Modal, Select, message } from 'antd'

import { getWorker } from '@/utils/user'

import './index.less'

const { Option } = Select;

// 导航项
const items = [
    {
        title: '队列',
        to: '/home/queue',
        classNames: 'queue-item',
        icon: () => (<UserOutlined className="item-icon" style={{ color: '#109efc' }} />),
        hasSelect: false
    },
    {
        title: '预约',
        to: '/home/calling',
        type: '1',
        classNames: 'subscribe-item',
        icon: () => (<SafetyCertificateTwoTone className="item-icon" twoToneColor='rgb(21, 245, 133)' />),
        hasSelect: true,
        //拥有的窗口号
        powers: ['1', '2', '3', '4', '5']
    },
    {
        title: '现场',
        to: '/home/calling',
        type: '2',
        classNames: 'scene-item',
        icon: () => (<EnvironmentTwoTone className="item-icon" twoToneColor='#1890ff' />),
        hasSelect: true,
        //拥有的窗口号
        powers: ['6', '7', '8']
    },
    {
        title: '加急',
        to: '/home/calling',
        type: '3',
        classNames: 'urgent-item',
        icon: () => (<ThunderboltTwoTone className="item-icon" twoToneColor='#eccb52fc' />),
        hasSelect: true,
        //拥有的窗口号
        powers: ['9', '10']
    },
    {
        title: '信息查询',
        to: '/home/message',
        classNames: 'message-item',
        icon: () => (<EditTwoTone className="item-icon" twoToneColor='#109efc' />),
        hasSelect: false
    },
]

export default memo(function Main(props) {

    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [selectItem, setItem] = useState('/home/queue');
    // const [selectVal, setVal] = useState(0);
    const { push } = useHistory();
    const worker = getWorker();
    const handleClick = (item) => {
        const { to, hasSelect, title, powers, type } = item;
        if (!hasSelect) {
            push({ pathname: to, state: { title } });
            return;
        } else {
            push({ pathname: to, search: qs.stringify({ currentNum: worker.windowNumber, title, type }) });
        }
        // setIsModalVisible(true);
        // setItem(item);
    };

    // const handleOk = () => {
    //     const { to, title, type } = selectItem;
    //     console.log(selectVal);
    //     if (!selectVal) {
    //         message.warning('请选择你当前的窗口');
    //         return;
    //     }
    //     push({ pathname: to, search: qs.stringify({ currentNum: selectVal, title, type }) });
    //     setIsModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };
    return (
        <div className="services-wrap">
            <div className="service-container">
                {
                    items.map(item => {
                        return (
                            <div key={item.title} onClick={() => handleClick(item)} className={"service-item " + item.classNames}>
                                {
                                    item.icon()
                                }
                                <span className="item-title">{item.title}</span>
                            </div>
                        )
                    })
                }
                {/* <Modal
                    centered
                    keyboard
                    cancelText='取消'
                    okText='确定'
                    width='400px'
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}>
                    <span>当前窗口为：</span>
                    <Select
                        size='large'
                        style={{ width: 200 }}
                        placeholder="请选择你当前的窗口"
                        onChange={(value) => setVal(value)}
                    >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                    </Select>
                </Modal> */}

            </div>
        </div>
    )
})

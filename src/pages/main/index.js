import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    SafetyCertificateTwoTone,
    EnvironmentTwoTone,
    ThunderboltTwoTone,
    UserOutlined,
    EditTwoTone
} from '@ant-design/icons'

import { Modal, Select } from 'antd'

import './index.less'

const { Option } = Select;

// 导航项
const items = [
    {
        title: '队列',
        to: '/home/queue',
        classNames: 'queue-item',
        icon: () => (<UserOutlined className="item-icon" style={{ color: '#109efc' }} />),
        hasSelect:false
    },
    {
        title: '预约',
        to: '/home/subscribe',
        classNames: 'subscribe-item',
        icon: () => (<SafetyCertificateTwoTone className="item-icon" twoToneColor='rgb(21, 245, 133)' />),
        hasSelect:true
    },
    {
        title: '现场',
        to: '/home/scene',
        classNames: 'scene-item',
        icon: () => (<EnvironmentTwoTone className="item-icon" twoToneColor='#1890ff' />),
        hasSelect:true
    },
    {
        title: '加急',
        to: '/home/urgent',
        classNames: 'urgent-item',
        icon: () => (<ThunderboltTwoTone className="item-icon" twoToneColor='#eccb52fc' />),
        hasSelect:true
    },
    {
        title: '信息反馈',
        to: '/home/message',
        classNames: 'message-item',
        icon: () => (<EditTwoTone className="item-icon" twoToneColor='#109efc' />),
        hasSelect:false
    },
]

export default memo(function Main(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectPath, setPath] = useState('/home/queue');
    const [selectVal, setVal] = useState('1');
    const { push } = useHistory();
    const handleClick = (path,hasSelect) => {
        if(!hasSelect) {
            push(path);
            return;
        }
        setIsModalVisible(true);
        setPath(path)
    };

    const handleOk = () => {
        push({ pathname: selectPath, state: { currentNum: selectVal } });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="service-container">
            {
                items.map(i => {
                    return (
                        <div onClick={() => handleClick(i.to,i.hasSelect)} className={"service-item " + i.classNames}>
                            {
                                i.icon
                            }
                            <span className="item-title">{i.title}</span>
                        </div>
                    )
                })
            }
            <Modal
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
            </Modal>
        </div>
    )
})

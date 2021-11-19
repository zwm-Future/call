import React, { memo, useEffect } from 'react'
import {
    SafetyCertificateTwoTone,
    EnvironmentTwoTone,
    ThunderboltTwoTone,
    UserOutlined,
    EditTwoTone
} from '@ant-design/icons'
import './index.less'
import { NavLink } from 'react-router-dom'


export default memo(function Main(props) {
    return (
        <div className="service-container">
            <NavLink to="/home/queue" className="service-item queue-item">
                <UserOutlined className="item-icon" style={{ color: '#109efc' }} />
                <span className="item-title">队列</span>
            </NavLink>
            <NavLink to="/home/subscribe" className="service-item subscribe-item">
                <SafetyCertificateTwoTone className="item-icon" twoToneColor='rgb(21, 245, 133)' />
                <span className="item-title">预约</span>
            </NavLink>
            <NavLink to="/home/scene" className="service-item scene-item">
                <EnvironmentTwoTone className="item-icon" twoToneColor='#1890ff' />
                <span className="item-title">现场</span>
            </NavLink>
            <NavLink to="/home/urgent" className="service-item urgent-item">
                <ThunderboltTwoTone className="item-icon" twoToneColor='#eccb52fc' />
                <span className="item-title">加急</span>
            </NavLink>
            <NavLink to="/home/message" className="service-item message-item">
                <EditTwoTone className="item-icon" twoToneColor='#109efc' />
                <span className="item-title">信息反馈</span>
            </NavLink>
        </div>
    )
})

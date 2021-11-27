import React from 'react'
import './index.less'
import { Button } from 'antd';
import { ApiTwoTone } from '@ant-design/icons'

import TagView from './Tagsview';
export default function Header(props) {
    return (
        <div className="header-wrap">
            <div className="header-left">
                <h2 className="logo-name">FCMS</h2>
                <h3>财务叫号管理系统</h3>
            </div>
            <TagView />
            <div className="right-menu">
                <div className="logout-wrap">
                    <Button type="primary" size="middle" shape="round" icon={<ApiTwoTone style={{ fontSize: '17px' }} twoToneColor="#ffffff" />} className="logout-btn">
                        退出
                    </Button>
                </div>
            </div>
        </div>
    )
}

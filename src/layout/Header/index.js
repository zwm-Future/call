import React from 'react'
import './index.less'
import { Breadcrumb } from 'antd';

import TagView from './Tagsview';

export default function Header(props) {
    return (
        <div className="header-wrap">
            <div className="header-left">
                <h2 className="logo-name">FCMS</h2>
                <h3>财务叫号管理系统</h3>
            </div>
            <div className="tagviews-container">
                <TagView />
            </div>
            <div className="right-menu">
                <Breadcrumb separator="">
                    <Breadcrumb.Item>Location</Breadcrumb.Item>
                    <Breadcrumb.Separator>:</Breadcrumb.Separator>
                    <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        </div>
    )
}

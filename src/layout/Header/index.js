import React,{memo} from 'react'
import './index.less'

import TagView from './Tagsview';
import LogoutBtn from '@/components/logoutBtn'
export default memo(function Header(props) {
    return (
        <div className="header-wrap">
            <div className="header-left">
                <h2 className="logo-name">FCMS</h2>
                <h3>财务叫号管理系统</h3>
            </div>
            <TagView pathName={props.pathName}/>
            <div className="right-menu">
                <div className="logout-wrap">
                    <LogoutBtn />
                </div>
            </div>
        </div>
    )
})

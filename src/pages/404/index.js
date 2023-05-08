import React, { memo } from 'react'
import './index.less'
import { useHistory } from 'react-router-dom'
import {Button} from 'antd'
import { HomeTwoTone } from '@ant-design/icons'
import error_404 from './404.png'
import error_text from './404_msg.png'

export default memo(function Error_page(props) {
    const {replace} = useHistory()
    return (
        <div className="error_wrap">
            <div className="error-container">
                <img className="png" src={error_404}  alt="404"/>
                <img className="png msg" src={error_text} />
                <p>
                <Button icon={<HomeTwoTone />} size="large" shape="round" onClick={() => {replace('/home/index')}} style={{color:'#4f9bd9'}}>返回首页</Button>
                </p>
            </div>
            <div className="cloud"></div>
        </div>
    )
})

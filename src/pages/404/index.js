import React, { memo, useEffect } from 'react'
import './index.less'

import error_404 from './404.png'
import error_text from './404_msg.png'

export default memo(function Error_page(props) {
    useEffect(() => {
        console.log('Error_page', props);
    })
    return (
        <div className="error_wrap">
            <div className="error-container">
                <img className="png" src={error_404}  alt="404"/>
                <img className="png msg" src={error_text} />
                <p>
                <button>返回首页</button>
                </p>
            </div>
            <div className="cloud"></div>
        </div>
    )
})

import React, { memo } from 'react'
import {Redirect} from 'react-router-dom'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import renderRoutes from '@/utils/renderRoutes'
import './index.less'

// 映射路由跳转方式
const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back',
    REPLACE: 'forward'
}

export default memo(function AppMain(props) {
    // 默认进入子组件index
    if(props.location.pathname === '/home'){
        console.log('comein');
        return (
            <Redirect path={"/home" } exact from={"/home"}  to="/home/index" />
        )
    }
    return (
        <div className="main-wrap">
            <div className="main">
                <TransitionGroup
                    childFactory={child => React.cloneElement(
                        child,
                        { classNames: ANIMATION_MAP[props.history.action] }
                    )}
                    className="main-container"
                >
                    <CSSTransition
                        timeout={500}//每个动画节时间
                        key={props.location.pathname}
                    >
                        {/* 渲染routes */}
                        {renderRoutes(props.route.routes, props.authed, props.authPath, {}, { location: props.location })}
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    )
})

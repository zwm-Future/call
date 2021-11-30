import React, { memo, useEffect } from 'react'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import renderRoutes from '@/utils/renderRoutes'
import './index.less'
const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back',
    REPLACE: 'forward'
}

export default memo(function AppMain(props) {
    useEffect(() => {
        console.log('AppMain', props);
    })
    return (
        <div className="main-wrap">
            <div className="main">
                <TransitionGroup
                    // className={'router-wrapper'}
                    childFactory={child => React.cloneElement(
                        child,
                        { classNames: ANIMATION_MAP[props.history.action] }
                    )}
                    className="main-container"
                >
                    <CSSTransition
                        timeout={500}
                        key={props.location.pathname}
                    >
                        {renderRoutes(props.route.routes, props.authed, props.authPath, {}, { location: props.location })}
                    </CSSTransition>
                </TransitionGroup>
            </div>
        </div>
    )
})

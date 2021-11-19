import React, { memo, useEffect, createContext } from 'react'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';


import renderRoutes from '../../utils/renderRoutes'

import Header from '../../components/Header'
import './index.less'

const ANIMATION_MAP = {
    PUSH: 'forward',
    POP: 'back',
    REPLACE: 'forward'
}

export const HeaderContext = createContext();

export default memo(function Home(props) {
    useEffect(() => {
        console.log('Home', props);
    })
    return (
        <div className="home-wrap">
            <HeaderContext.Provider
            value={{
                    pathName:props.location.pathname
                }}>
                <Header />
            </HeaderContext.Provider>
            <div className="main-wrap">
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

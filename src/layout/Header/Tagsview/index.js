import React, {  memo } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import routes from '@/routers'


function getViews(pathName, routes) {
    let views = [];
    routes.forEach(r => {
        if (r.title && pathName.search(r.path) !== -1) {
            views.push(r);
        }
        if (r.routes) {
            views = [...views, ...getViews(pathName, r.routes)];
        }
    })
    return views;
}


export default memo(function TagView(props) {
    const { pathName } = props
    const { push } = useHistory()
    const views = getViews(pathName, routes)

    return (
        <div className="tagviews-container">
            <TransitionGroup className="breadcrumb-container" >
                {views.map(({ path, title }, index) => {
                    return (
                        <CSSTransition appear key={path} timeout={1000} classNames="breadcrumb" >
                            {
                                index === views.length - 1 ?
                                    (
                                        <div  className='current-view view-item'>
                                            <div className="title">{title}</div>
                                        </div>
                                    ) :
                                    (<div onClick={() => { push(path) }}  className='previous-view view-item'>
                                        <div className="title">{title}</div>
                                    </div>
                                    )
                            }
                        </CSSTransition>
                    )
                })}
            </TransitionGroup>
        </div>
    )
})

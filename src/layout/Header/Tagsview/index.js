import React, { useEffect, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import { HeaderContext } from '../../index'
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


export default function TagView(props) {
    const { pathName } = useContext(HeaderContext)
    const { push } = useHistory()
    const views = getViews(pathName, routes)

    let refs = [];

    useEffect(() => {
        // refs = creacteRefs();
        // console.log('refs', refs);
        console.log('views', views);
        console.log('props', props);
    })

    // function creacteRefs() {
    //     const r = []
    //     for (let i = 0; i < views.length; i++) {
    //         r.push(createRef());
    //     }
    //     return r;
    // }
    return (
        <div className="tagviews-container">
            <TransitionGroup className="breadcrumb-container" >
                {views.map(({ path, title }, index) => {
                    // refs[index] = React.useRef(null);
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
}

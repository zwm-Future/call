import React, { useEffect, createRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import './index.less'
import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import { HeaderContext } from '../../../pages/home'
import routes from '../../../routers'


function getViews(pathName, routes) {
    let views = [];
    routes.map(r => {
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
    const {push} = useHistory()
    const views = getViews(pathName, routes)

    let refs = [];

    useEffect(() => {
        refs = creacteRefs();
        console.log('refs', refs);
        console.log('views', views);
        console.log('props', props);
    })

    function creacteRefs() {
        const r = []
        for (let i = 0; i < views.length; i++) {
            r.push(createRef());
        }
        return r;
    }
    return (
        <div>
            <TransitionGroup className="breadcrumb-container" >
                {views.map((v, i) => (
                    <CSSTransition appear key={v.path} timeout={1000} classNames="breadcrumb" nodeRef={refs[i]}>
                        {
                            i == views.length - 1 ?
                                (
                                    <div ref={refs[i]} className='current-view view-item'>
                                        <div className="title">{v.title}</div>
                                    </div>
                                ) :
                                (   <div onClick={() => {push(v.path)}}  ref={refs[i]} className='previous-view view-item'>
                                        <div className="title">{v.title}</div>
                                    </div>
                                )
                        }
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}

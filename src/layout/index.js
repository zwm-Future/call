import React, { memo, useEffect } from 'react'
import {Redirect} from 'react-router-dom'


import Header from './Header'
import AppMain from './AppMain'


export default memo(function Home(props) {
    useEffect(() => {
        console.log('Home', props);
        console.log('Home', props.location.pathname);
    })
    if(props.location.pathname === '/home'){
        console.log('comein');
        return (
            <Redirect path={"/home" } exact from={"/home"}  to="/home/index" />
        )
    }

    return (
        <div className="home-wrap">
            <Header pathName={props.location.pathname} />
            <AppMain  {...props} />
        </div>
    )
})
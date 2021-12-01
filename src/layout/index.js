import React, { memo} from 'react'
import Header from './Header'
import AppMain from './AppMain'


export default memo(function Home(props) {

    return (
        <div className="home-wrap">
            <Header pathName={props.location.pathname} />
            <AppMain  {...props} />
        </div>
    )
})
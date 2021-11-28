import React, { memo, useEffect, createContext } from 'react'


import Header from './Header'
import AppMain from './AppMain'

export const HeaderContext = createContext();

export default memo(function Home(props) {
    useEffect(() => {
        console.log('Home', props);
    })
    return (
        <div className="home-wrap">
            <HeaderContext.Provider
                value={{
                    pathName: props.location.pathname
                }}>
                <Header />
            </HeaderContext.Provider>
            <AppMain  {...props} />
        </div>
    )
})
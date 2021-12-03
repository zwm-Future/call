/* 
    根据路由表配置路由
*/

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
const renderRoutes = (routes, authPath, extraProps = {}, switchProps = {}) => routes ? (
    <Switch {...switchProps}>
        {routes.map((route, i) => (
            <Route
                key={route.key || i}
                path={route.path}
                exact={route.exact}
                strict={route.strict}
                render={props => routeRender(route, authPath, props, extraProps)}
            />
        ))}
    </Switch>
) : null

//路由渲染前判断
const routeRender = (route, authPath = '/login', props, extraProps) => {
    const token = localStorage.getItem("authed");
    //有token
    if(token && route.path === authPath) {
        return (
            <Redirect to={{ pathname: '/home/index' }} />
        )
    }
    //有token 或者 不是权限路由
    if (token || !route.requiresAuth) {
        return route.render
            ? route.render({ ...props,authPath, ...extraProps, route: route })
            : route.component && (
                <route.component {...props} authPath={authPath} {...extraProps} route={route} />
            );
    } else {
        //没有token 重定向登录
        return (
            <Redirect to={{ pathname: authPath }} />
        )
    }
}

export default renderRoutes
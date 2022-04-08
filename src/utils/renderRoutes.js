/* 
    根据路由表配置路由
*/

import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import {getWorker} from './user'
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
    const worker = getWorker();
    const isLogin = Boolean(token && worker && worker.id);
    //登录页
    if (!isLogin && route.path === authPath) {
        return route.component && (
            <route.component {...props} authPath={authPath} {...extraProps} route={route} />
        );
    }//没有token && path 不是 login   ==> 重定向登录
    else if (!isLogin) {
        //没有token 重定向登录
        return (
            <Redirect to={{ pathname: authPath }} />
        )
    }//有token && path 是 login ==> 重定向首页
    else if (isLogin && route.path === authPath) {
        return (
            <Redirect to={{ pathname: '/home/index' }} />
        )
    }//有token  不是权限路由
    else if (isLogin && !route.requiresAuth) {
        return route.render
            ? route.render()
            : <route.component {...props} authPath={authPath} {...extraProps} route={route} />;
    }

    // Process --> //注释 ⬆  放开⬇



    // return route.render
    // ? route.render({ ...props,authPath, ...extraProps, route: route })
    // : route.component && (
    //     <route.component {...props} authPath={authPath} {...extraProps} route={route} />
    // );
}

export default renderRoutes
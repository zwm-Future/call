import React from 'react';
import { Redirect } from "react-router-dom";
import Login from '@/pages/login'
import Calling from '@/pages/calling'
import Queue from '@/pages/queue'
import Main from '@/pages/main'

import Home from '@/layout'

// import Layout from '../layout'
// const Login = React.lazy(_ => import("../pages/login"));
// const Home = React.lazy(_ => import("../pages/home"));
// const Subscribe = React.lazy(_ => import("../pages/subscribe"));
// const Scene = React.lazy(_ => import("../pages/scene"));
// const Urgent = React.lazy(_ => import("../pages/urgent"));

const routes =  [
    {
        path: "/",
        exact: true,
        requiresAuth: false,
        render: () => (
            <Redirect to="/home" />
        )
    },
    {
        path: '/login',
        component: Login,
        requiresAuth: false,
        title: '登录'
    },
    {
        path: '/home',
        component: Home,
        requiresAuth: true, //需要登陆后才能跳转的页面
        title: '首页',
        routes: [
            {
                path: "/home",
                exact: true,
                render: () => (
                    <Redirect to={"/home/index"} />
                )
            },
            {
                path: '/home/index',
                component: Main,
            },
            {
                path: '/home/Calling',
                component: Calling,
                title: '叫号',
            },
            {
                path: '/home/queue',
                component: Queue,
                title: '队列',
            }
        ]
    },
];

export default routes;
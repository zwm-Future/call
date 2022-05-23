import React from 'react';
import { Redirect } from "react-router-dom";
import Login from '@/pages/login'
import Calling from '@/pages/calling'
import Queue from '@/pages/queue'
import Message from '@/pages/message'
import Main from '@/pages/main'
import Error_page from '@/pages/404'

import Home from '@/layout'


const routes = [
    {
        path: "/",
        exact: true,
        // requiresAuth: false,
        render: () => (
            <Redirect to="/home/index" />
        )
    },
    {
        path: '/login',
        component: Login,
        // requiresAuth: false,
        title: '登录'
    },
    {
        path: '/home',
        component: Home,
        // requiresAuth: true, 
        title: '首页',
        routes: [
            {
                path: '/home/index',
                component: Main,
            },
            {
                path: '/home/calling',
                component: Calling,
                title: '叫号',
            },
            {
                path: '/home/queue',
                component: Queue,
                title: '队列',
            },
            {
                path: '/home/message',
                component: Message,
                title: '信息查询',
            }
        ]
    },
    {
        path: '/404',
        component: Error_page,
        title: '404',
    },
    {
        path: '*',
        render: () => (
            <Redirect to={"/404"} />
        )
    }
];

export default routes;
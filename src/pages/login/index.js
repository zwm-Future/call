import React, { memo, useContext } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import { login } from '@/api/user'
import './index.less'

import { Authtext } from '@/auth'


export default memo(function Login() {
    const { authed, dispatch } = useContext(Authtext);
    const onFinish = (values) => {
        login(values).then(res => {
            console.log(res);
            const { code, message, data } = res;
            if (code == 0 && message == "成功") {
                dispatch("addAuth");
                // 本地存user
                localStorage.setItem("user",JSON.stringify(data))
            }
        })
        // logout().then(data => {
        //     console.log(data);
        // })
    };

    const onFinishFailed = (errorInfo) => {
        // message.error('提交失败！');
    };
    return (
        <div className="login-wrap">
            <div className="form-wrap">
                <h2>账号登录</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="姓名" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input prefix={<SmileOutlined className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item className="login-button-item">
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                    <a className="login-form-forgot">
                        忘记密码?
                    </a>
                </Form>
            </div>
        </div>
    )
})

import React, { memo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import { login } from '@/api/user'
import './index.less'

export default memo(function Login() {
    const [isLoading, setLoading] = useState(false);
    const { push } = useHistory()

    const onFinish = (values) => {
        login(values).then(res => {
            const { code, other } = res;
            setLoading(false);
            if (code == 0 && res.message == "成功") {
                // 本地存token
                localStorage.setItem("authed", other)
                push('/home/index');
            } else if (code === 1) {
                message.warning(res.message);
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        message.error('提交失败！');
        setLoading(false);
    };

    const handleClick = () => {
        setLoading(true)
    }

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
                        name="name"
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
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入学工号',
                            },
                        ]}
                    >
                        <Input prefix={<SmileOutlined className="site-form-item-icon" />} placeholder="学工号" />
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
                        <Button loading={isLoading} onClick={handleClick} type="primary" htmlType="submit" className="login-form-button">
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

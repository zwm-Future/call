import React, { memo, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd';
import { LockOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { login } from '@/api/user'
import { verifyCodeUrl } from '../../api/baseUrl';
import { saveWorker } from '@/utils/user'
import './index.less'

export default memo(function Login() {
    const [isLoading, setLoading] = useState(false);
    const [codeImg, setCodeImg] = useState(verifyCodeUrl)
    const { push } = useHistory()
    let timerCode = useRef(null);
    useEffect(() => {
        refreshCode();
    }, [])
    const onFinish = async (values) => {
        try {
            const res = await login(values);
            const { code, other, data } = res;
            if (!code && res.message == "成功") {
                // 本地存token user
                localStorage.setItem("authed", other)
                saveWorker(JSON.stringify(data));
                push('/home/index');
            } else {
                refreshCode();
                setLoading(false);
                message.warning(res.message)
            }
        } catch (err) {
            refreshCode();
            setLoading(false);
            err.message && message.error(err.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error('提交失败！');
        setLoading(false);
    };

    const handleClick = () => {
        setLoading(true)
    }
    const refreshCode = () => {
        setCodeImg(`${verifyCodeUrl}?id=${Date.now()}`)
    }
    //防抖
    const clickCode = () => {
        if (timerCode.current) {
            clearTimeout(timerCode.current);
            timerCode.current = null;
        } else {
            refreshCode();
        }
        timerCode.current = setTimeout(() => {
            clearTimeout(timerCode.current);
            timerCode.current = null;
        }, 500);
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
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码',
                            }
                        ]}
                    >
                        <div style={{ display: 'flex' }}>
                            <Input className='ipt-item' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="验证码" />
                            <img src={codeImg} alt="验证码" onClick={clickCode} />
                        </div>
                    </Form.Item>
                    <Form.Item className="login-button-item">
                        <Button loading={isLoading} onClick={handleClick} type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
})

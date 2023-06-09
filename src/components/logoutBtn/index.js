import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Modal, message } from 'antd';
import { ApiTwoTone, ExclamationCircleOutlined } from '@ant-design/icons'
import { removeWorker } from '@/utils/user'
import { logout } from '@/api/user'
export default function LogoutBtn() {
    const { replace } = useHistory()
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        //删除token user
        const authed = localStorage.getItem("authed");
        authed &&  logout({ token: authed });
        localStorage.removeItem("authed")
        removeWorker();
        setIsModalVisible(false);
        message.success('退出成功');
        replace('/login')
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <Modal
                width="300px"
                closable={false}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                style={{ fontSize: '30px' }}>
                <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: '30px' }} /> <span style={{ fontSize: '20px' }}>确定退出？</span>
            </Modal>
            <Button type="primary" onClick={showModal} size="middle" shape="round" icon={<ApiTwoTone style={{ fontSize: '17px' }} twoToneColor="#ffffff" />} >
                退出
            </Button>
        </div >
    )
}

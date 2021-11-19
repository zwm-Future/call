import React from 'react'
import { useHistory } from 'react-router-dom'

import {LeftCircleTwoTone } from '@ant-design/icons'
import {Button} from 'antd'

export default function BackButton(props) {
    const {goBack} = useHistory()
   
    return (
        <Button type="primary" shape="round" onClick={goBack} size="large" icon={<LeftCircleTwoTone />} ></Button>
    )
}


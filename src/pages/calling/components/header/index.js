import { memo } from 'react'
import './header.less'
import { Divider } from 'antd';
export default memo(function Header(props) {
    console.log('process-table', props);
    return (
        <div className="h_header">
            {props.title}窗口号：{props.window}
            <Divider className="line" />
        </div>
    )
})
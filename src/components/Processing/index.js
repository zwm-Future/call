import { memo, useEffect } from 'react'
import Header from './header'
import Queue from './queue'
import ProcessTable from './processTable'

export default memo(function Processing(props) {
    let { type, currentNum: window, title } = props.date
    // 可能进入此页面时拿不到数据 ，退回到主页面
    useEffect(() => {
        console.log('Processing', props);

    })
    return (
        <div>
            <Header title={title} window={window} />
            <div style={{
                display: 'flex'
            }}>
                <div style={{ flex: 1 }}><Queue title={title} /></div>
                <div style={{ flex: 3 }}><ProcessTable /></div>
            </div>
        </div>
    )
})

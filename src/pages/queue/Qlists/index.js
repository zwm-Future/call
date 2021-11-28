import { memo } from 'react'
import Cqueue from '@/components/Cqueue'

export default memo(function Qlists(props) {
    console.log('Qlist', props);
    return (
        <div className="h_scroll" style={{ padding: 10, display: 'flex' }}>
            <div style={{ boxSizing: 'border-box', width: '34%', paddingRight: '2.1%' }}>
                <div style={{ display: 'flex', fontSize: 22, padding: '0 8px 10px 0', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 'bold' }}>预约队列</div>
                    <div style={{ fontSize: 19 }}>共（{12}）人</div>
                </div>
                <Cqueue isFullScreen={props.isFullScreen} />
            </div>
            <div style={{ boxSizing: 'border-box', width: '34%', paddingRight: '2.1%' }}>
                <div style={{ display: 'flex', fontSize: 22, padding: '0 4px 10px 0', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 'bold' }}>现场队列</div>
                    <div style={{ fontSize: 19 }}>共（{12}）人</div>
                </div>
                <Cqueue isFullScreen={props.isFullScreen} />
            </div>
            <div style={{ boxSizing: 'border-box', width: '32.6%' }} >
                <div style={{ display: 'flex', fontSize: 22, padding: '0 4px 10px 0', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 'bold' }}>加急队列</div>
                    <div style={{ fontSize: 19 }}>共（{12}）人</div>
                </div>
                <Cqueue isFullScreen={props.isFullScreen} />
            </div>
        </div>
    )
})
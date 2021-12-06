import { memo, useEffect } from 'react'
import Header from './header'
import Queue from './queue'
import ProcessTable from './processTable'
import { siteCall, urgentCall, signCall } from '@/api/call.js'

export default memo(function Processing(props) {
    let { type, currentNum: window, title } = props.date

    useEffect(() => {
        console.log('Processing', props);
        if (type == 1) {
            signCall(window).then(res => {
                console.log(res)
            }).catch(err => {
                console.log('err', err)
            })
        } else if (type == 2) {
            siteCall(window).then(res => {
                console.log(res)
            }).catch(err => {
                console.log('err', err)
            })
        }
        else if (type == 3) {
            urgentCall(window).then(res => {
                console.log(res)
            }).catch(err => {
                console.log('err', err)
            })
        } else {
            alert("WRONG")
        }

    })
    return (
        <div style={{ padding: 10 }}>
            <Header title={title} window={window} />
            <div style={{
                display: 'flex'
            }}>
                <div style={{ width: '40%' }}><Queue title={title} /></div>
                <div style={{ width: '60%' }}><ProcessTable /></div>
            </div>
        </div>
    )
})

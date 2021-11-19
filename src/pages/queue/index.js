import React,{memo,useEffect} from 'react'

export default  memo(function Queue(props) {
    useEffect(() => {
        console.log('Scene',props);
    })
    return (
        <div>
            Queue
        </div>
    )
})

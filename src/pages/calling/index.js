import React,{memo,useEffect} from 'react'

export default  memo(function Calling(props) {
    useEffect(() => {
        console.log('Calling',props);
    })
    return (
        <div>
            Calling
        </div>
    )
})

import React,{memo,useEffect} from 'react'

export default  memo(function Urgent(props) {
    useEffect(() => {
        console.log('Urgent',props);
    })
    return (
        <div>
           Urgent 
        </div>
    )
})

import React,{memo,useEffect} from 'react'

import BackButton from '../../components/BackButton'

export default  memo(function Scene(props) {
    useEffect(() => {
        console.log('Scene',props);
    })
    return (
        <div>
            <BackButton />
        </div>
    )
})

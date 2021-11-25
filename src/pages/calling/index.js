import React, { memo, useEffect } from 'react'
import Processing from '@/components/Processing'

export default memo(function Calling(props) {

    useEffect(() => {
        console.log('Calling', props.location.state);
    })
    return (
        <div style={{
            height:'800px',
        }}>
            <Processing date={props.location.state} />
        </div>
    )
})

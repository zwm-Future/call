import React, { memo } from 'react'
import qs from 'qs'
import Processing from './components/index'

export default memo(function Calling(props) {
    return (
        <div>
            <Processing date={qs.parse(props.location.search, { ignoreQueryPrefix: true })} />
        </div>
    )
})

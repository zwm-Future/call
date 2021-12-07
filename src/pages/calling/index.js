import React, { memo, useEffect } from 'react'
import qs from 'qs'
import Processing from '@/components/Processing'

export default memo(function Calling(props) {
    return (
        <div>
            <Processing date={qs.parse(props.location.search,{ignoreQueryPrefix: true})} />
        </div>
    )
})

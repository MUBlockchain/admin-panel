import React from 'react'
import { LinearProgress } from '@material-ui/core'

const LinearLoadingComponent = (props) => {

    return <>
        <div style={{ "width": "80%", "margin": "auto" }}>
            <div style={{"margin": "20px"}}><LinearProgress /></div>
            <p><b>{props.text}</b></p>
        </div>
    </>
}

export default LinearLoadingComponent
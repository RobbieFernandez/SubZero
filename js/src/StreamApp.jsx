import {AudioVisualiser} from './AudioVisualiser'
import React from 'react'
import ReactDOM from 'react-dom'

function StreamApp(props) {
    return <div>
        <h1>{"Stream"}</h1>
        <AudioVisualiser
            audioStreamUrl={props.audioStreamUrl}
            canvasWidth={props.visualiserWidth}
            canvasHeight={props.visualiserHeight}
            numBars={100}
            barGap={2}
            barColour={"#9933ff"}
            autoPlay={true}
        />
    </div>
}

export function initStreamApp(audioStreamUrl, visualiserWidth, visualiserHeight, containerId) {
    console.log(document.getElementById(containerId))
    ReactDOM.render(
        <StreamApp
            audioStreamUrl={audioStreamUrl}
            visualiserWidth={visualiserWidth}
            visualiserHeight={visualiserHeight}
        />,
        document.getElementById(containerId)
    )
}
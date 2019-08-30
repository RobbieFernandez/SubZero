import {AudioVisualiser} from './AudioVisualiser'
import React from 'react'
import ReactDOM from 'react-dom'

class StreamApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"playing": false};
    }

    startPlaying() {
        this.setState({"playing": true});
    }

    render() {
        return <div>
            <h1>{"Stream"}</h1>
            {
                this.state.playing ?
                <AudioVisualiser
                    audioStreamUrl={this.props.audioStreamUrl}
                    canvasWidth={this.props.visualiserWidth}
                    canvasHeight={this.props.visualiserHeight}
                    numBars={100}
                    barGap={2}
                    barColour={"#9933ff"}
                    autoPlay={true}
                /> :
                <button onClick={this.startPlaying.bind(this)}>Play</button>
            }
        </div>
    }
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
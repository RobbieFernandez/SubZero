import {AudioVisualiser} from './AudioVisualiser'
import React from 'react'
import ReactDOM from 'react-dom'

class StreamApp extends React.Component {
    constructor(props) {
        super(props);
        this.audioContext = new AudioContext();
        this.state = {"playing": false};
        this.audioContext.suspend()
    }

    toggleAudio() {
        let shouldPlay = !this.state.playing;
        this.setState({"playing": shouldPlay});
        if (shouldPlay) {
            this.audioContext.resume()
        } else {
            this.audioContext.suspend()
        }
    }

    render() {
        return <div>
            <button onClick={this.toggleAudio.bind(this)}>
                {this.state.playing? "Pause" : "Start"}
            </button>
            <AudioVisualiser
                audioContext={this.audioContext}
                audioStreamUrl={this.props.audioStreamUrl}
                numBars={100}
                barGap={2}
                barColour={"#9933ff"}
                autoPlay={true}
            />
        </div>
    }
}

export function initStreamApp(audioStreamUrl, containerId) {
    console.log(document.getElementById(containerId))
    ReactDOM.render(
        <StreamApp
            audioStreamUrl={audioStreamUrl}
        />,
        document.getElementById(containerId)
    )
}
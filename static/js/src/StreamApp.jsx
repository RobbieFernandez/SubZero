import {AudioVisualiser} from './AudioVisualiser'
import React from 'react'
import ReactDOM from 'react-dom'

class StreamApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"playing": false, "started": false};
    }

    toggleAudio(audioContext) {
        let shouldPlay = !this.state.playing;
        this.setState({"playing": shouldPlay});

        if (shouldPlay) {
            audioContext.resume();
        } else {
            audioContext.suspend();
        }
    }

    handlePlayClick() {
        let audioContext = this.state.started ?
            this.state.audioContext :
            new AudioContext();

        if (!this.state.started) {
            this.setState({
                "audioContext": audioContext,
                "started": true
            });
        }

        this.toggleAudio(audioContext);
    }

    render() {
        return <div>
            <div className="playButtonContainer">
                <button className="playButton" onClick={this.handlePlayClick.bind(this)}>
                    {this.state.playing? "Pause" : "Start"}
                </button>
            </div>
            {this.state.started &&
                <AudioVisualiser
                    audioContext={this.state.audioContext}
                    audioStreamUrl={this.props.audioStreamUrl}
                    numBars={100}
                    barGap={2}
                    barColour={"#9933ff"}
                />
            }
        </div>
    }
}

export function initStreamApp(audioStreamUrl, containerId) {
    ReactDOM.render(
        <StreamApp
            audioStreamUrl={audioStreamUrl}
        />,
        document.getElementById(containerId)
    )
}
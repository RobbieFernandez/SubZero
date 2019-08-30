import React from 'react'

export class AudioVisualiser extends React.Component {
    drawVisualiser(analyser) {
        requestAnimationFrame(() => this.drawVisualiser(analyser));

        let freqData = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(freqData);

        let canvas = this.refs.visualiserCanvas;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.props.barColour;

        let barWidth = canvas.width / this.props.numBars - this.props.barGap;

        // Freq will be a uint between 0 and 255
        // Divide by 265 instead of 255 so we never hit the top of the canvas
        let getBarHeight = freq => (freq / 265) * canvas.height;

        for (var i = 0; i < this.props.numBars; i++) {
            let bar_x = i * (barWidth + this.props.barGap);
            let frequency = freqData[i];
            ctx.fillRect(bar_x, canvas.height, barWidth, -getBarHeight(frequency))
        }
    }

    initVisualisation() {
        let context = new AudioContext();
        let analyser = context.createAnalyser();
        let audio = this.refs.audio;
        let audioSrc = context.createMediaElementSource(audio);

        audioSrc.connect(analyser);
        audioSrc.connect(context.destination);
        analyser.connect(context.destination);
        this.drawVisualiser(analyser)
    }

    componentDidMount() {
        this.initVisualisation()
    }

    render() {
        return <div>
            <audio
                autoPlay={this.props.autoPlay}
                crossOrigin='anonymous'
                ref={'audio'}
                src={this.props.audioStreamUrl}
            ></audio>
            <canvas
                ref={"visualiserCanvas"}
                width={this.props.canvasWidth || 300}
                height={this.props.canvasHeight || 300}
            ></canvas>
        </div>
    }
}
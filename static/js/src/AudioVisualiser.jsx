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

        let getBarHeight = freq => (freq / 255) * canvas.height;

        for (var i = 0; i < this.props.numBars; i++) {
            let bar_x = i * (barWidth + this.props.barGap);
            let frequency = freqData[i];
            ctx.fillRect(bar_x, canvas.height, barWidth, -getBarHeight(frequency))
        }
    }

    initVisualisation() {
        let context = this.props.audioContext;
        let analyser = context.createAnalyser();
        let audio = this.refs.audio;
        let audioSrc = context.createMediaElementSource(audio);

        audioSrc.connect(analyser);
        audioSrc.connect(context.destination);
        analyser.connect(context.destination);
        this.drawVisualiser(analyser)
    }

    getCanvasHeight() {
        return window.innerHeight / 2;
    }

    getCanvasWidth() {
        return window.innerWidth;
    }

    resizeCanvas() {
        let canvas = this.refs.visualiserCanvas;
        canvas.width = this.getCanvasWidth();
        canvas.height = this.getCanvasHeight();
    }

    componentDidMount() {
        this.initVisualisation();
        window.addEventListener("resize", this.resizeCanvas.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeCanvas.bind(this));
    }

    render() {
        return <div>
            <audio
                autoPlay={true}
                crossOrigin='anonymous'
                ref={'audio'}
                src={this.props.audioStreamUrl}
            ></audio>
            <canvas
                className="visualiserCanvas"
                ref={"visualiserCanvas"}
                width={this.getCanvasWidth()}
                height={this.getCanvasHeight()}
            ></canvas>
        </div>
    }
}
import _ from 'lodash';

import styles from './Visualizer.styl';

const DRAW_INTERVAL = 50;

export default class Visualizer extends React.PureComponent {

    static displayName = 'Visualizer';

    static propTypes = {
        isActive: React.PropTypes.bool.isRequired
    };

    constructor() {
        super();

        this._barCount = 4;
        this._barWidth = 2;
        this._barGap = 1;
        this._barColor = '#d77a2b';
        this._minBarHeight = 2;
        this._timerId = null;
        this._bars = [];

        this._draw = this._draw.bind(this);
        this._drawBar = this._drawBar.bind(this);
    }

    componentDidMount() {
        this._ctx = this._canvas.getContext('2d');
        this._maxBarHeight = this._canvas.height;
        this._initBars();
    }

    componentDidUpdate() {
        if (this.props.isActive) {
            this._startDraw();
        } else {
            this._stopDraw();
        }
    }

    _initBars() {
        for (var i = 0; i < this._barCount; i++) {
            this._bars.push({
                width: this._barWidth,
                height: this._calculateBarHeight(this._minBarHeight, this._maxBarHeight),
                x: i * (this._barWidth + this._barGap),
                y: 0,
                direction: 'down'
            });
        }
        this._startDraw();
    }

    _calculateBarHeight(min, max) {
        return _.random(min, max, false);
    }

    _draw() {
        this._bars.forEach((bar) => {
            if (bar.direction === 'down') {
                if (bar.height > this._minBarHeight) {
                    bar.height--;
                    this._drawBar(bar);
                } else {
                    bar.buffHeight = this._calculateBarHeight(this._maxBarHeight / 2, this._maxBarHeight);
                    bar.direction = 'up';
                }
            } else {
                if (bar.height < bar.buffHeight) {
                    bar.height++;
                    this._drawBar(bar);
                } else {
                    bar.direction = 'down';

                }
            }
        });
    }

    _startDraw() {
        if (this.props.isActive) {
            this._timerId = setInterval(this._draw, DRAW_INTERVAL);
        }
        this._draw();
    }

    _drawBar(bar) {
        this._ctx.clearRect(bar.x, bar.y, bar.width, this._maxBarHeight);
        this._ctx.fillStyle = this._barColor;
        this._ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
    }

    _stopDraw() {
        clearInterval(this._timerId);
    }

    render() {
        return (
            <span className={styles.wrap}>
                <canvas
                    width="12"
                    height="10"
                    className={styles.canvas}
                    ref={(c) => this._canvas = c}
                >
                </canvas>
            </span>
        );
    }
}

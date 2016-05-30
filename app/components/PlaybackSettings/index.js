import classNames from 'classnames';
import styles from './PlaybackSettings.styl';

export default class PlaybackSettings extends React.Component {

    static displayName = 'PlaybackSettings';

    static propTypes = {
        isShuffle: React.PropTypes.bool.isRequired,
        loopMode: React.PropTypes.string.isRequired,
        volume: React.PropTypes.number.isRequired,
        volumeMin: React.PropTypes.number.isRequired,
        volumeMax: React.PropTypes.number.isRequired,
        volumeStep: React.PropTypes.number.isRequired,

        onShuffleClicked: React.PropTypes.func.isRequired,
        onLoopClicked: React.PropTypes.func.isRequired,
        onVolumeMinusMouseDown: React.PropTypes.func.isRequired,
        onVolumeMinusMouseUp: React.PropTypes.func.isRequired,
        onVolumePlusMouseDown: React.PropTypes.func.isRequired,
        onVolumePlusMouseUp: React.PropTypes.func.isRequired,
        onVolumeRangeInput: React.PropTypes.func.isRequired
    };

    _renderLoopButton() {
        const { loopMode, onLoopClicked } = this.props;
        const className = classNames('js-repeat-button', {
            [styles.repeat]: loopMode === 'off',
            [styles.repeatActive]: loopMode !== 'off'
        });

        return (
            <button className={className} onClick={onLoopClicked}>
                <i className="material-icons">{loopMode === 'one' ? 'repeat_one' : 'repeat'}</i>
            </button>
        );
    }

    render() {
        const {
            isShuffle,
            onShuffleClicked,
            volume,
            volumeMin,
            volumeMax,
            volumeStep,
            onVolumePlusMouseDown,
            onVolumePlusMouseUp,
            onVolumeMinusMouseDown,
            onVolumeMinusMouseUp,
            onVolumeRangeInput
        } = this.props;
        const shuffleClass = classNames('js-shuffle-button', {
            [styles.shuffle]: !isShuffle,
            [styles.shuffleActive]: isShuffle
        });
        const volumeRangeStyle = {
            backgroundSize: `${volume * 100}% 100%`
        };

        return (
            <div className={styles.wrap}>
                {this._renderLoopButton()}
                <span className="separate"></span>
                <button className={shuffleClass} onClick={onShuffleClicked}>
                    <i className="material-icons">shuffle</i>
                </button>
                <span className="separate"></span>
                <div className={styles.volume}>
                    <button
                        className={classNames('js-volume-minus', styles.volumeButton)}
                        onMouseDown={onVolumeMinusMouseDown}
                        onMouseUp={onVolumeMinusMouseUp}
                    >
                        –
                    </button>
                    <label className={styles.volumeRangeWrap}>
                        <input
                            className={styles.volumeRange}
                            type="range"
                            min={volumeMin}
                            max={volumeMax}
                            step={volumeStep}
                            onInput={onVolumeRangeInput}
                            value={volume}
                            style={volumeRangeStyle}
                        />
                    </label>
                    <button
                        className={classNames('js-volume-plus', styles.volumeButton)}
                        onMouseDown={onVolumePlusMouseDown}
                        onMouseUp={onVolumePlusMouseUp}
                    >
                        +
                    </button>
                </div>
                <span className="separate"></span>
            </div>
        );
    }

}

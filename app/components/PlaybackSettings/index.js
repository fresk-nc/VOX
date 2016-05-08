import classNames from 'classnames';
import styles from './PlaybackSettings.styl';

export default class PlaybackSettings extends React.Component {

    static displayName = 'PlaybackSettings';

    static propTypes = {
        isShuffle: React.PropTypes.bool.isRequired,
        loopMode: React.PropTypes.string.isRequired,

        onShuffleClicked: React.PropTypes.func.isRequired,
        onLoopClicked: React.PropTypes.func.isRequired
    };

    _renderLoopButton() {
        const { loopMode, onLoopClicked } = this.props;
        const className = classNames({
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
        const { isShuffle, onShuffleClicked } = this.props;
        const shuffleClass = classNames({
            [styles.shuffle]: !isShuffle,
            [styles.shuffleActive]: isShuffle
        });

        return (
            <div className={styles.wrap}>
                {this._renderLoopButton()}
                <span className="separate"></span>
                <button className={shuffleClass} onClick={onShuffleClicked}>
                    <i className="material-icons">shuffle</i>
                </button>
                <span className="separate"></span>
            </div>
        );
    }

}

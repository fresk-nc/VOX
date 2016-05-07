import classNames from 'classnames';
import styles from './PlaybackSettings.styl';

export default class PlaybackSettings extends React.Component {

    static displayName = 'PlaybackSettings';

    static propTypes = {
        isShuffle: React.PropTypes.bool.isRequired,

        onShuffleClicked: React.PropTypes.func.isRequired
    };

    render() {
        const { isShuffle, onShuffleClicked } = this.props;
        const shuffleClass = classNames({
            [styles.shuffle]: !isShuffle,
            [styles.shuffleActive]: isShuffle
        });

        return (
            <div className={styles.wrap}>
                {/*
                    <button className={styles.repeat}>
                        <i className="material-icons">repeat</i>
                    </button>
                */}
                <button className={shuffleClass} onClick={onShuffleClicked}>
                    <i className="material-icons">shuffle</i>
                </button>
            </div>
        );
    }

}

import moment from 'moment';
import classNames from 'classnames';

import PlaybackSettingsContainer from 'containers/PlaybackSettingsContainer';
import PlaybackInformerContainer from 'containers/PlaybackInformerContainer';
import styles from './Playback.styl';
import Track from 'records/Track';

export default class Playback extends React.Component {

    static displayName = 'Playback';

    static propTypes = {
        currentTrack: React.PropTypes.instanceOf(Track),
        isChangingTime: React.PropTypes.bool.isRequired,
        currentTime: React.PropTypes.number.isRequired,
        progress: React.PropTypes.number.isRequired,

        onProgressClick: React.PropTypes.func.isRequired,
        onProgressMouseDown: React.PropTypes.func.isRequired,
        onQuitClick: React.PropTypes.func.isRequired
    };

    _renderContent() {
        const { currentTrack } = this.props;

        if (currentTrack) {
            const {
                isChangingTime,
                currentTime,
                progress,
                onProgressClick,
                onProgressMouseDown
            } = this.props;
            const time = currentTrack.duration - currentTime;

            const progressClass = classNames('js-progress-bar', {
                [styles.progress]: !isChangingTime,
                [styles.progressActive]: isChangingTime
            });

            return (
                <div className={styles.content}>
                    <PlaybackInformerContainer />
                    <div className={styles.main}>
                        <div className={styles.artistLine}>
                            <span className={styles.artist}>{currentTrack.artist}</span>
                            <span className={styles.album}>{currentTrack.album}</span>
                        </div>
                        <div className={styles.titleLine}>
                            <span className={styles.title}>{currentTrack.title}</span>
                            <span className={styles.time}>
                                - {moment.duration(time, 'seconds').format('m:ss', { trim: false })}
                            </span>
                        </div>
                        <PlaybackSettingsContainer />
                    </div>
                    <div className={progressClass} onClick={onProgressClick} onMouseDown={onProgressMouseDown}>
                        <div className={styles.progressBg}></div>
                        <div className={styles.progressLine} style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.logo}>
                <span>VOX</span>
            </div>
        );
    }

    render() {
        const { onQuitClick } = this.props;

        return (
            <div className={styles.wrap}>
                <span className={styles.quit} onClick={onQuitClick}>
                    <i className="material-icons">clear</i>
                </span>
                {this._renderContent()}
            </div>
        );
    }

}

import moment from 'moment';
import classNames from 'classnames';

import styles from './Playback.styl';
import player from 'lib/player';

export default class Playback extends React.Component {

    static displayName = 'Playback';

    _renderContent() {
        const { currentTrack } = this.props;

        if (currentTrack) {
            const {
                isChangingTime,
                currentTime,
                progress,
                onProgressClicked,
                onProgressMouseDown
            } = this.props;
            const time = currentTrack.duration - currentTime;

            const progressClass = classNames({
                [styles.progress]: !isChangingTime,
                [styles.progressActive]: isChangingTime
            });

            return (
                <div className={styles.content}>
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
                    </div>
                    <div className={progressClass} onClick={onProgressClicked} onMouseDown={onProgressMouseDown}>
                        <div className={styles.progressBg}></div>
                        <div className={styles.progressLine} style={{width: `${progress}%`}}></div>
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
        return (
            <div className={styles.wrap}>
                {this._renderContent()}
            </div>
        )
    }

};

import moment from 'moment';
import classNames from 'classnames';
import styles from './PlayerHeader.styl';
import player from 'lib/player';

export default class PlayerHeader extends React.Component {

    static displayName = 'PlayerHeader';

    constructor(props) {
        super(props);

        this.state = {
            isChangingTime: false,
            currentTime: 0,
            progress: 0
        };

        this._onTimeUpdate = this._onTimeUpdate.bind(this);

        this._handleProgressClick = this._handleProgressClick.bind(this);
        this._handleProgressMouseDown = this._handleProgressMouseDown.bind(this);
        this._handleWindowMouseUp = this._handleWindowMouseUp.bind(this);
        this._handleWindowMouseMove = this._handleWindowMouseMove.bind(this);
    }

    componentDidMount() {
        player.on('timeupdate', this._onTimeUpdate);
    }

    _onTimeUpdate(currentTime, progress) {
        if (this.state.isChangingTime) {
            return;
        }

        this.setState({ currentTime, progress });
    }

    _handleProgressClick(event) {
        const progress = event.clientX * 100 / window.outerWidth;
        const currentTime = this.props.currentTrack.duration * (progress / 100);

        player.setProgress(currentTime);
    }

    _handleProgressMouseDown() {
        window.addEventListener('mousemove', this._handleWindowMouseMove, false);
        window.addEventListener('mouseup', this._handleWindowMouseUp, false);

        this.setState({ isChangingTime: true });
    }

    _handleWindowMouseUp() {
        window.removeEventListener('mousemove', this._handleWindowMouseMove);
        window.removeEventListener('mouseup', this._handleWindowMouseUp);

        this.setState({ isChangingTime: false });

        player.setProgress(this.state.currentTime);
    }

    _handleWindowMouseMove(event) {
        const clientX = event.clientX;
        const windowWidth = window.outerWidth;
        const { currentTrack } = this.props;

        let progress;
        let currentTime;

        if (clientX < 0) {
            progress = 0;
            currentTime = 0;
        } else if (clientX > windowWidth) {
            progress = 100;
            currentTime = currentTrack.duration;
        } else {
            progress = clientX * 100 / windowWidth;
            currentTime = currentTrack.duration * (progress / 100);
        }

        this.setState({ currentTime, progress });
    }

    _renderContent() {
        const { currentTrack } = this.props;
        const { currentTime, progress, isChangingTime } = this.state;

        if (currentTrack) {
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
                    <div
                        className={progressClass}
                        onClick={this._handleProgressClick}
                        onMouseDown={this._handleProgressMouseDown}
                        >
                        <div className={styles.progressBg}></div>
                        <div
                            className={styles.progressLine}
                            style={{width: `${progress}%`}}
                            >
                        </div>
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

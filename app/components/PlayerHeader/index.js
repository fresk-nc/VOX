import styles from './PlayerHeader.styl';
import player from 'lib/player';
import moment from 'moment';

export default class PlayerHeader extends React.Component {

    static displayName = 'PlayerHeader';

    constructor(props) {
        super(props);

        this.state = {
            currentTime: 0
        };
    }

    componentDidMount() {
        player.on('timeupdate', this._onTimeUpdate.bind(this));
    }

    _onTimeUpdate(currentTime) {
        this.setState({ currentTime });
    }

    _renderContent() {
        const { currentTrack } = this.props;

        if (currentTrack) {
            const time = currentTrack.duration - this.state.currentTime;

            return (
                <div className={styles.main}>
                    <div className={styles.artistLine}>
                        <span className={styles.artist}>{currentTrack.artist}</span>
                        <span className={styles.album}>{currentTrack.album}</span>
                    </div>
                    <div className={styles.titleLine}>
                        <span className={styles.title}>{currentTrack.title}</span>
                        <span className={styles.time}>
                            - {moment.duration(time, 'seconds').format('m:ss')}
                        </span>
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

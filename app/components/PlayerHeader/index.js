import styles from './PlayerHeader.styl';
import player from 'lib/player';

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
            return (
                <div>
                    <div>{currentTrack.artist}</div>
                    <div>{currentTrack.title}</div>
                    <div>{this.state.currentTime}</div>
                </div>
            );
        }

        return (
            <div className={styles.logo}>VOX</div>
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

import styles from './PlaybackBar.styl';

export default class PlaybackBar extends React.Component {

    static displayName = 'PlaybackBar';

    static propTypes = {
        play: React.PropTypes.bool.isRequired,

        onPauseClicked: React.PropTypes.func.isRequired,
        onPlayClicked: React.PropTypes.func.isRequired,
        onPrevClicked: React.PropTypes.func.isRequired,
        onNextClicked: React.PropTypes.func.isRequired,
        onMinimizeClicked: React.PropTypes.func.isRequired,
        onSearchClicked: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this._handlePlayClick = this._handlePlayClick.bind(this);
    }

    _handlePlayClick() {
        const { play, onPlayClicked, onPauseClicked } = this.props;

        play ? onPauseClicked() : onPlayClicked();
    }

    render() {
        return (
            <div className={styles.wrap}>
                <button className={styles.minimize} onClick={this.props.onMinimizeClicked}>
                    <i className="material-icons">more_horiz</i>
                </button>
                <span className="separate"></span>
                <div className={styles.main}>
                    <button className={styles.prev} onClick={this.props.onPrevClicked}>
                        <i className="material-icons">fast_rewind</i>
                    </button>
                    <button className={styles.play} onClick={this._handlePlayClick}>
                        <i className="material-icons">{this.props.play ? 'pause' : 'play_arrow'}</i>
                    </button>
                    <button className={styles.next} onClick={this.props.onNextClicked}>
                        <i className="material-icons">fast_forward</i>
                    </button>
                </div>
                <span className="separate"></span>
                <button className={styles.search} onClick={this.props.onSearchClicked}>
                    <i className="material-icons">search</i>
                </button>
            </div>
        );
    }

}

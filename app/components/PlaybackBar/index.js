import styles from './PlaybackBar.styl';

export default class PlaybackBar extends React.Component {

    static displayName = 'PlaybackBar';

    static propTypes = {
        play: React.PropTypes.bool.isRequired,

        onPauseClick: React.PropTypes.func.isRequired,
        onPlayClick: React.PropTypes.func.isRequired,
        onPrevClick: React.PropTypes.func.isRequired,
        onNextClick: React.PropTypes.func.isRequired,
        onMinimizeClick: React.PropTypes.func.isRequired,
        onSearchClick: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this._handlePlayClick = this._handlePlayClick.bind(this);
    }

    _handlePlayClick() {
        const { play, onPlayClick, onPauseClick } = this.props;

        play ? onPauseClick() : onPlayClick();
    }

    render() {
        return (
            <div className={styles.wrap}>
                <span className={styles.minimize} onClick={this.props.onMinimizeClick}>
                    <i className="material-icons">more_horiz</i>
                </span>
                <span className="separate"></span>
                <div className={styles.main}>
                    <span className={styles.prev} onClick={this.props.onPrevClick}>
                        <i className="material-icons">fast_rewind</i>
                    </span>
                    <span className={styles.play} onClick={this._handlePlayClick}>
                        <i className="material-icons">{this.props.play ? 'pause' : 'play_arrow'}</i>
                    </span>
                    <span className={styles.next} onClick={this.props.onNextClick}>
                        <i className="material-icons">fast_forward</i>
                    </span>
                </div>
                <span className="separate"></span>
                <span className={styles.search} onClick={this.props.onSearchClick}>
                    <i className="material-icons">search</i>
                </span>
            </div>
        );
    }

}

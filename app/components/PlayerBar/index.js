import styles from './PlayerBar.styl';

export default class PlayerBar extends React.Component {

    static displayName = 'PlayerBar';

    constructor(props) {
        super(props);

        this.onPlayClick = this.onPlayClick.bind(this);
    }

    onPlayClick() {
        const { play, onPlayClicked, onPauseClicked } = this.props;

        play ? onPauseClicked() : onPlayClicked();
    }

    render() {
        const { play, onPrevClicked, onNextClicked, onMinimizeClicked } = this.props;

        return (
            <div className={styles.wrap}>
                <button className={styles.minimize} onClick={onMinimizeClicked}>
                    <i className="material-icons">more_horiz</i>
                </button>
                <div className={styles.main}>
                    <button className={styles.prev} onClick={onPrevClicked}>
                        <i className="material-icons">fast_rewind</i>
                    </button>
                    <button className={styles.play} onClick={this.onPlayClick}>
                        <i className="material-icons">{play ? 'pause' : 'play_arrow'}</i>
                    </button>
                    <button className={styles.next} onClick={onNextClicked}>
                        <i className="material-icons">fast_forward</i>
                    </button>
                </div>
                <button className={styles.search}>
                    <i className="material-icons">search</i>
                </button>
            </div>
        );
    }

};
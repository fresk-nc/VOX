import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import moment from 'moment';
import styles from './Track.styl';

export default class Track extends React.Component {

    static displayName = 'Track';

    static propTypes = {
        index: React.PropTypes.number.isRequired,
        artist: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        duration: React.PropTypes.number.isRequired,
        isCurrent: React.PropTypes.bool.isRequired,

        onDoubleClick: React.PropTypes.func.isRequired,
        onContextMenu: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {
            onDoubleClick,
            onContextMenu,
            index,
            title,
            artist,
            duration,
            isCurrent
        } = this.props;

        const wrapClass = classNames({
            [styles.common]: !isCurrent,
            [styles.current]: isCurrent
        });

        return (
            <div
                className={wrapClass}
                onDoubleClick={onDoubleClick}
                onContextMenu={onContextMenu}
            >
                <span className={styles.index}>
                    {index}
                </span>
                <div className={styles.info}>
                    <div className={styles.name}>
                        <span className={styles.title}>
                            {title}
                        </span>
                        <span className={styles.artist}>
                            {artist}
                        </span>
                    </div>
                    <span className={styles.duration}>
                        {moment.duration(duration, 'seconds').format('m:ss', { trim: false })}
                    </span>
                </div>
            </div>
        );
    }

}

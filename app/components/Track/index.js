import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import moment from 'moment';
import styles from './Track.styl';

export default class Track extends React.Component {

    static displayName = 'Track';

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {
            onDoubleClick,
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
            <div className={wrapClass} onDoubleClick={onDoubleClick}>
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
                    <span>
                        {moment.duration(duration, 'seconds').format('m:ss', { trim: false })}
                    </span>
                </div>
            </div>
        );
    }

};

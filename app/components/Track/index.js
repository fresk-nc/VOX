import styles from './Track.styl';
import classNames from 'classnames';
import moment from 'moment';

export default class Track extends React.Component {

    static displayName = 'Track';

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

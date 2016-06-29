import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import moment from 'moment';

import styles from './Track.styl';
import TrackRecord from 'records/Track';

export default class Track extends React.Component {

    static displayName = 'Track';

    static propTypes = {
        index: React.PropTypes.number.isRequired,
        track: React.PropTypes.instanceOf(TrackRecord).isRequired,

        onClick: React.PropTypes.func.isRequired,
        onDoubleClick: React.PropTypes.func.isRequired,
        onContextMenu: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this._handleClick = this._handleClick.bind(this);
        this._handleDoubleClick = this._handleDoubleClick.bind(this);
        this._handleContextMenu = this._handleContextMenu.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.track.isSelected && this.props.track.isSelected) {
            this._node.scrollIntoViewIfNeeded();
        }
    }
    
    _handleClick() {
        this.props.onClick(this.props.track.id);
    }
    
    _handleDoubleClick() {
        this.props.onDoubleClick(this.props.track.id);
    }
    
    _handleContextMenu() {
        this.props.onContextMenu(this.props.track);
    }

    render() {
        const { index, track } = this.props;
        const {
            title,
            artist,
            duration,
            isCurrent,
            isSelected
        } = track;

        const wrapClass = classNames({
            [styles.common]: !isCurrent && !isSelected,
            [styles.current]: isCurrent && !isSelected,
            [styles.selected]: isSelected
        });

        return (
            <div
                className={wrapClass}
                onClick={this._handleClick}
                onDoubleClick={this._handleDoubleClick}
                onContextMenu={this._handleContextMenu}
                ref={(c) => this._node = c}
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

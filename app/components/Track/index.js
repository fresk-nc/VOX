import PureRenderMixin from 'react-addons-pure-render-mixin';
import { DragSource, DropTarget } from 'react-dnd';
import classNames from 'classnames';
import moment from 'moment';

import styles from './Track.styl';
import TrackRecord from 'records/Track';
import dragDropTypes from 'constants/dragDropTypes';

const trackDragSpec = {
    beginDrag(props) {
        return {
            id: props.track.id
        };
    }
};

const trackDropSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;

        if (props.track.id !== draggedId) {
            props.onDropHover(draggedId, props.track.id);
        }
    }
};

class Track extends React.Component {

    static displayName = 'Track';

    static propTypes = {
        index: React.PropTypes.number.isRequired,
        track: React.PropTypes.instanceOf(TrackRecord).isRequired,
        isDragging: React.PropTypes.bool.isRequired,

        onClick: React.PropTypes.func.isRequired,
        onDoubleClick: React.PropTypes.func.isRequired,
        onContextMenu: React.PropTypes.func.isRequired,
        onDropHover: React.PropTypes.func.isRequired,
        connectDropTarget: React.PropTypes.func.isRequired,
        connectDragSource: React.PropTypes.func.isRequired
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
    
    _handleClick(event) {
        this.props.onClick(event, this.props.track.id);
    }
    
    _handleDoubleClick() {
        this.props.onDoubleClick(this.props.track.id);
    }
    
    _handleContextMenu() {
        this.props.onContextMenu(this.props.track);
    }

    render() {
        const { index, track, connectDragSource, connectDropTarget, isDragging } = this.props;
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

        const style = {
            opacity: isDragging ? 0 : 1
        };

        return connectDragSource(connectDropTarget(
            <div
                className={wrapClass}
                onClick={this._handleClick}
                onDoubleClick={this._handleDoubleClick}
                onContextMenu={this._handleContextMenu}
                ref={(c) => this._node = c}
                style={style}
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
        ));
    }
}

const dragOrderTrack = DragSource(dragDropTypes.TRACK, trackDragSpec, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))(Track);

const dropOrderTrack = DropTarget(dragDropTypes.TRACK, trackDropSpec, (connect) => ({
    connectDropTarget: connect.dropTarget()
}))(dragOrderTrack);

export default dropOrderTrack;

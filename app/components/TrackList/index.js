import Track from 'components/Track';
import { List } from 'immutable';

export default class TrackList extends React.Component {

    static displayName = 'TrackList';

    static propTypes = {
        tracks: React.PropTypes.instanceOf(List).isRequired,

        onTrackClick: React.PropTypes.func.isRequired,
        onTrackDoubleClick: React.PropTypes.func.isRequired,
        onTrackContextMenu: React.PropTypes.func.isRequired
    };

    render() {
        const {
            tracks,
            onTrackClick,
            onTrackDoubleClick,
            onTrackContextMenu
        } = this.props;

        return (
            <div>
                {tracks.map((track, i) =>
                    <Track
                        key={track.id}
                        index={i + 1}
                        track={track}
                        onClick={onTrackClick}
                        onDoubleClick={onTrackDoubleClick}
                        onContextMenu={onTrackContextMenu}
                    />
                )}
            </div>
        );
    }
}

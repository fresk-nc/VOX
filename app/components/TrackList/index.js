import Track from 'components/Track';

export default class TrackList extends React.Component {

    static displayName = 'TrackList';

    static propTypes = {
        tracks: React.PropTypes.array.isRequired,

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
                        artist={track.artist}
                        title={track.title}
                        duration={track.duration}
                        isCurrent={track.isCurrent}
                        isSelected={track.isSelected}
                        onClick={() => onTrackClick(track.id)}
                        onDoubleClick={() => onTrackDoubleClick(track.id)}
                        onContextMenu={() => onTrackContextMenu(track)}
                    />
                )}
            </div>
        );
    }
}

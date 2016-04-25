import Track from 'components/Track';

const TrackList = ({ tracks, onTrackDoubleClick }) => (
    <div>
        {tracks.map((track, i) =>
            <Track
                key={track.id}
                index={i + 1}
                artist={track.artist}
                title={track.title}
                duration={track.duration}
                isCurrent={track.isCurrent}
                onDoubleClick={() => onTrackDoubleClick(track.id)}
            />
        )}
    </div>
);

TrackList.displayName = 'TrackList';
TrackList.propTypes = {
    tracks: React.PropTypes.array.isRequired,
    onTrackDoubleClick: React.PropTypes.func.isRequired
};

export default TrackList;

import Track from 'components/Track';

const TrackList = ({ tracks, onTrackDoubleClick }) => (
    <div>
        {tracks.map((track, i) =>
            <Track
                key={track.get('id')}
                index={i + 1}
                artist={track.get('artist')}
                title={track.get('title')}
                duration={track.get('duration')}
                isCurrent={track.get('isCurrent')}
                onDoubleClick={() => onTrackDoubleClick(track.get('id'))}
            />
        )}
    </div>
);

TrackList.displayName = 'TrackList';

export default TrackList;

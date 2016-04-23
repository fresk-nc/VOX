import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    prevTrack,
    nextTrack,
    playTrack,
    pauseTrack,
    loadTracks,
    toggleMinimize
} from 'actions';
import { getCurrentTrack, getCount } from 'reducers/tracks';
import PlaybackBar from 'components/PlaybackBar';

class PlaybackBarContainer extends React.Component {

    static displayName = 'PlaybackBarContainer';

    render() {
        const {
            trackCount,
            currentTrack,
            settings,
            toggleMinimize,
            playTrack,
            loadTracks,
            pauseTrack,
            prevTrack,
            nextTrack
        } = this.props;

        return (
            <PlaybackBar
                play={Boolean(currentTrack && currentTrack.get('isPlay'))}
                onMinimizeClicked={() => toggleMinimize(settings.get('minimize'))}
                onPlayClicked={trackCount ? playTrack : loadTracks}
                onPauseClicked={pauseTrack}
                onPrevClicked={prevTrack}
                onNextClicked={nextTrack}
            />
        );
    }

}

function mapStateToProps(state) {
    return {
        settings: state.settings,
        trackCount: getCount(state.tracks),
        currentTrack: getCurrentTrack(state.tracks)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        prevTrack,
        nextTrack,
        playTrack,
        pauseTrack,
        loadTracks,
        toggleMinimize
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaybackBarContainer);

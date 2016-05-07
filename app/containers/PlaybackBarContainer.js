import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

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

    static propTypes = {
        currentTrack: React.PropTypes.instanceOf(Map),
        settings: React.PropTypes.instanceOf(Map),
        trackCount: React.PropTypes.number.isRequired,

        prevTrack: React.PropTypes.func.isRequired,
        nextTrack: React.PropTypes.func.isRequired,
        playTrack: React.PropTypes.func.isRequired,
        pauseTrack: React.PropTypes.func.isRequired,
        loadTracks: React.PropTypes.func.isRequired,
        toggleMinimize: React.PropTypes.func.isRequired
    };

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
                onPrevClicked={() => trackCount ? prevTrack() : null}
                onNextClicked={() => trackCount ? nextTrack() : null}
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

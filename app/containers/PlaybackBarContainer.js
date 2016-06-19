import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { delay } from 'lodash';

import {
    prevTrack,
    nextTrack,
    playTrack,
    pauseTrack,
    loadTracks,
    toggleMinimize,
    showSearch,
    hideSearch
} from 'actions';
import { getCurrentTrack, getCount } from 'selectors/tracks';
import PlaybackBar from 'components/PlaybackBar';
import Track from 'records/Track';
import Settings from 'records/Settings';
import Search from 'records/Search';

class PlaybackBarContainer extends React.Component {

    static displayName = 'PlaybackBarContainer';

    static propTypes = {
        currentTrack: React.PropTypes.instanceOf(Track),
        settings: React.PropTypes.instanceOf(Settings),
        trackCount: React.PropTypes.number.isRequired,
        search: React.PropTypes.instanceOf(Search),

        prevTrack: React.PropTypes.func.isRequired,
        nextTrack: React.PropTypes.func.isRequired,
        playTrack: React.PropTypes.func.isRequired,
        pauseTrack: React.PropTypes.func.isRequired,
        loadTracks: React.PropTypes.func.isRequired,
        toggleMinimize: React.PropTypes.func.isRequired,
        showSearch: React.PropTypes.func.isRequired,
        hideSearch: React.PropTypes.func.isRequired
    };

    _handleSearchClick() {
        const { search, settings, hideSearch, showSearch, toggleMinimize } = this.props;

        if (settings.minimize) {
            toggleMinimize(settings.minimize);
        }

        if (search.isShowed) {
            delay(hideSearch, 30);
        } else {
            delay(showSearch, 30);
        }
    }

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
                play={Boolean(currentTrack && currentTrack.isPlay)}
                onMinimizeClicked={() => toggleMinimize(settings.minimize)}
                onPlayClicked={trackCount ? playTrack : loadTracks}
                onPauseClicked={pauseTrack}
                onPrevClicked={() => trackCount ? prevTrack() : null}
                onNextClicked={() => trackCount ? nextTrack() : null}
                onSearchClicked={this._handleSearchClick.bind(this)}
            />
        );
    }

}

function mapStateToProps(state) {
    return {
        settings: state.settings,
        trackCount: getCount(state),
        currentTrack: getCurrentTrack(state),
        search: state.search
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        prevTrack,
        nextTrack,
        playTrack,
        pauseTrack,
        loadTracks,
        toggleMinimize,
        showSearch,
        hideSearch
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlaybackBarContainer);

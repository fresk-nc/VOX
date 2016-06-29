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

    constructor(props, context) {
        super(props, context);

        this._handleMinimizeClick = this._handleMinimizeClick.bind(this);
        this._handlePlayClick = this._handlePlayClick.bind(this);
        this._handlePrevClick = this._handlePrevClick.bind(this);
        this._handleNextClick = this._handleNextClick.bind(this);
        this._handleSearchClick = this._handleSearchClick.bind(this);
    }

    _handleMinimizeClick() {
        const { toggleMinimize, settings } = this.props;

        toggleMinimize(settings.minimize);
    }

    _handlePlayClick() {
        const { trackCount, playTrack, loadTracks } = this.props;

        if (trackCount) {
            playTrack();
        } else {
            loadTracks();
        }
    }

    _handlePrevClick() {
        const { trackCount, prevTrack } = this.props;

        if (trackCount) {
            prevTrack();
        }
    }

    _handleNextClick() {
        const { trackCount, nextTrack } = this.props;

        if (trackCount) {
            nextTrack();
        }
    }

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
        const { currentTrack, pauseTrack } = this.props;

        return (
            <PlaybackBar
                play={Boolean(currentTrack && currentTrack.isPlay)}
                onMinimizeClick={this._handleMinimizeClick}
                onPlayClick={this._handlePlayClick}
                onPauseClick={pauseTrack}
                onPrevClick={this._handlePrevClick}
                onNextClick={this._handleNextClick}
                onSearchClick={this._handleSearchClick}
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

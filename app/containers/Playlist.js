import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { getTotalDuration, getCount } from 'reducers/tracks';
import { loadTracks, clearTracks, playTrack } from 'actions';
import player from 'lib/player';

import Toolbar from 'components/Toolbar';
import DropArea from 'components/DropArea';
import TrackListWrapper from 'components/TrackListWrapper';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';

class Playlist extends React.Component {

    static displayName = 'Playlist';

    static propTypes = {
        tracks: React.PropTypes.instanceOf(List),
        trackCount: React.PropTypes.number.isRequired,
        totalDuration: React.PropTypes.number.isRequired,

        loadTracks: React.PropTypes.func.isRequired,
        clearTracks: React.PropTypes.func.isRequired,
        playTrack: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        player.addTracks(this.props.tracks.toJS());
    }

    _renderTrackListContent() {
        const { tracks, trackCount, totalDuration, playTrack } = this.props;

        if (trackCount) {
            return (
                <div>
                    <TrackList
                        tracks={tracks.toJS()}
                        onTrackDoubleClick={(id) => playTrack(id)}
                    />
                    <Footer
                        trackCount={trackCount}
                        totalDuration={totalDuration}
                    />
                </div>
            );
        }

        return (
            <DropArea />
        );
    }

    render() {
        const { trackCount, loadTracks, clearTracks } = this.props;

        return (
            <div>
                <Toolbar
                    trackCount={trackCount}
                    onAddClicked={loadTracks}
                    onClearClicked={clearTracks}
                />
                <TrackListWrapper>
                    {this._renderTrackListContent()}
                </TrackListWrapper>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        tracks: state.tracks,
        trackCount: getCount(state.tracks),
        totalDuration: getTotalDuration(state.tracks)
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTracks,
        clearTracks,
        playTrack
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist);

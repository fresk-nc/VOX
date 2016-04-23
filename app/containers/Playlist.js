import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { getTotalDuration } from 'reducers/tracks';
import { loadTracks, clearTracks, playTrack } from 'actions';
import player from 'lib/player';

import Toolbar from 'components/Toolbar';
import DropArea from 'components/DropArea';
import TrackListWrapper from 'components/TrackListWrapper';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';

class Playlist extends React.Component {

    static displayName = 'Playlist';

    componentDidMount() {
        player.addTracks(this.props.tracks.toJS());
    }

    _renderTrackListContent() {
        const { tracks, totalDuration, playTrack } = this.props;

        if (tracks.size) {
            const momentDuration = moment.duration(totalDuration, 'seconds');
            const totalMinutes = momentDuration.minutes();
            const totalSeconds = momentDuration.seconds();

            return (
                <div>
                    <TrackList
                        tracks={tracks}
                        onTrackDoubleClick={(id) => playTrack(id)}
                    />
                    <Footer
                        trackCount={tracks.size}
                        totalMinutes={totalMinutes}
                        totalSeconds={totalSeconds}
                    />
                </div>
            );
        }

        return (
            <DropArea />
        );
    }

    render() {
        const { tracks, loadTracks, clearTracks } = this.props;

        return (
            <div>
                <Toolbar
                    trackCount={tracks.size}
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

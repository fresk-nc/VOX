import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import * as Actions from 'actions';
import { getTotalDuration, getCurrentTrack } from 'reducers/tracks';
import player from 'lib/player';
import PlayerHeader from 'components/PlayerHeader';
import PlayerBar from 'components/PlayerBar';
import Toolbar from 'components/Toolbar';
import DropArea from 'components/DropArea';
import TrackListWrapper from 'components/TrackListWrapper';
import TrackList from 'components/TrackList';
import Track from 'components/Track';
import Footer from 'components/Footer';

const BrowserWindow = require('electron').remote.BrowserWindow;

class App extends React.Component {

    static displayName = 'App';

    static propTypes = {
        actions: React.PropTypes.object.isRequired,
        tracks: React.PropTypes.object.isRequired
    };

    componentWillReceiveProps(nextProps) {


        // FIXME
        if (nextProps.settings.get('minimize') !== this.props.settings.get('minimize')) {
            if (nextProps.settings.get('minimize')) {
                BrowserWindow.getFocusedWindow().setSize(320, 122);
            } else {
                BrowserWindow.getFocusedWindow().setSize(320, 570);
            }
        }
    }

    componentDidMount() {
        player.addTracks(this.props.tracks.toJS());


        // FIXME
        if (this.props.settings.get('minimize')) {
            BrowserWindow.getAllWindows()[0].setSize(320, 122);
        } else {
            BrowserWindow.getAllWindows()[0].setSize(320, 570);
        }
    }

    _renderContent() {
        const { actions, tracks, totalDuration } = this.props;

        if (tracks.size) {
            const momentDuration = moment.duration(totalDuration, 'seconds');
            const totalMinutes = momentDuration.minutes();
            const totalSeconds = momentDuration.seconds();

            return (
                <div>
                    <TrackList>
                        {tracks.map((track, i) => {
                            return (
                                <Track
                                    key={track.get('id')}
                                    index={i + 1}
                                    artist={track.get('artist')}
                                    title={track.get('title')}
                                    duration={track.get('duration')}
                                    isCurrent={track.get('isCurrent')}
                                    onDoubleClick={() => actions.playTrack(track.get('id'))}
                                />
                            );
                        })}
                    </TrackList>
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
        const { actions, tracks, currentTrack, settings } = this.props;

        return (
            <div>
                <PlayerHeader
                    currentTrack={currentTrack && currentTrack.toJS()}
                />
                <PlayerBar
                    play={Boolean(currentTrack && currentTrack.get('isPlay'))}
                    onMinimizeClicked={() => actions.toggleMinimize(settings.get('minimize'))}
                    onPlayClicked={tracks.size ? actions.playTrack : actions.loadTracks}
                    onPauseClicked={actions.pauseTrack}
                    onPrevClicked={actions.prevTrack}
                    onNextClicked={actions.nextTrack}
                />
                <Toolbar
                    trackCount={tracks.size}
                    onAddClicked={actions.loadTracks}
                    onClearClicked={actions.clearTracks}
                />
                <TrackListWrapper>
                    {this._renderContent()}
                </TrackListWrapper>
            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        tracks: state.tracks,
        settings: state.settings,
        totalDuration: getTotalDuration(state.tracks),
        currentTrack: getCurrentTrack(state.tracks)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { injectIntl } from 'react-intl';

import { getTotalDuration, getCount } from 'reducers/tracks';
import player from 'lib/player';
import {
    loadTracks,
    loadTracksFromDrop,
    clearTracks,
    playTrack
} from 'actions';

import Toolbar from 'components/Toolbar';
import DropArea from 'components/DropArea';
import TrackListWrapper from 'components/TrackListWrapper';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';

const remote = require('electron').remote;
const Menu = remote.Menu;
const MenuItem = remote.MenuItem;

class Playlist extends React.Component {

    static displayName = 'Playlist';

    static propTypes = {
        tracks: React.PropTypes.instanceOf(List),
        trackCount: React.PropTypes.number.isRequired,
        totalDuration: React.PropTypes.number.isRequired,
        intl: React.PropTypes.object.isRequired,

        loadTracks: React.PropTypes.func.isRequired,
        loadTracksFromDrop: React.PropTypes.func.isRequired,
        clearTracks: React.PropTypes.func.isRequired,
        playTrack: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        player.addTracks(this.props.tracks.toJS());
    }

    _showTrackMenu(id) {
        const { playTrack, intl } = this.props;
        const menu = new Menu();

        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.play' }),
                click: () => playTrack(id)
            })
        );

        menu.popup(remote.getCurrentWindow());
    }

    _renderTrackListContent() {
        const {
            tracks,
            trackCount,
            totalDuration,
            playTrack,
            loadTracksFromDrop
        } = this.props;

        if (trackCount) {
            return (
                <div>
                    <TrackList
                        tracks={tracks.toJS()}
                        onTrackDoubleClick={(id) => playTrack(id)}
                        onTrackContextMenu={this._showTrackMenu.bind(this)}
                    />
                    <Footer
                        trackCount={trackCount}
                        totalDuration={totalDuration}
                    />
                </div>
            );
        }

        return (
            <DropArea onDropEnd={loadTracksFromDrop} />
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
        loadTracksFromDrop,
        clearTracks,
        playTrack
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Playlist));

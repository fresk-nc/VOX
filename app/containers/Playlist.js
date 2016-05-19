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
    removeTrack,
    playTrack
} from 'actions';

import Toolbar from 'components/Toolbar';
import DropArea from 'components/DropArea';
import TrackListWrapper from 'components/TrackListWrapper';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';

const { Menu, MenuItem, getCurrentWindow, shell } = require('electron').remote;

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
        removeTrack: React.PropTypes.func.isRequired,
        playTrack: React.PropTypes.func.isRequired
    };

    componentDidMount() {
        player.addTracks(this.props.tracks.toJS());
    }

    _showTrackMenu(track) {
        const { playTrack, removeTrack, intl } = this.props;
        const menu = new Menu();

        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.play' }),
                click: () => playTrack(track.id)
            })
        );
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.show.darwin' }),
                click: () => shell.showItemInFolder(track.src)
            })
        );
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.remove' }),
                click: () => removeTrack(track.id)
            })
        );
        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.removeWithFile' }),
                click: () => {
                    removeTrack(track.id);
                    shell.moveItemToTrash(track.src);
                }
            })
        );

        menu.popup(getCurrentWindow());
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
        removeTrack,
        playTrack
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(Playlist));

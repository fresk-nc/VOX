import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { injectIntl } from 'react-intl';

import { getTotalDuration, getCount, getSelectedTrack } from 'selectors/tracks';
import player from 'lib/player';
import {
    loadTracksFromDrop,
    removeTrack,
    playTrack,
    pauseTrack,
    selectTrack,
    selectNextTrack,
    selectPrevTrack
} from 'actions';
import keyboard from 'constants/KeyboardCodes';
import Track from 'records/Track';

import DropArea from 'components/DropArea';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';
import Loading from 'components/Loading';

const { Menu, MenuItem, getCurrentWindow, shell, clipboard } = require('electron').remote;

export class TrackListContainer extends React.Component {

    static displayName = 'TrackListContainer';

    static propTypes = {
        tracks: React.PropTypes.instanceOf(List),
        trackCount: React.PropTypes.number.isRequired,
        totalDuration: React.PropTypes.number.isRequired,
        selectedTrack: React.PropTypes.instanceOf(Track),
        isMinimized: React.PropTypes.bool.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        intl: React.PropTypes.object.isRequired,

        loadTracksFromDrop: React.PropTypes.func.isRequired,
        removeTrack: React.PropTypes.func.isRequired,
        playTrack: React.PropTypes.func.isRequired,
        pauseTrack: React.PropTypes.func.isRequired,
        selectTrack: React.PropTypes.func.isRequired,
        selectNextTrack: React.PropTypes.func.isRequired,
        selectPrevTrack: React.PropTypes.func.isRequired
    };

    constructor(props, context) {
        super(props, context);

        this._handleTrackClick = this._handleTrackClick.bind(this);
        this._handleTrackDoubleClick = this._handleTrackDoubleClick.bind(this);
        this._handleTrackContextMenu = this._handleTrackContextMenu.bind(this);
    }

    componentDidMount() {
        player.addTracks(this.props.tracks.toJS());

        window.addEventListener('keydown', this._handleWindowKeyDown.bind(this), false);
    }

    _handleWindowKeyDown(event) {
        if (this.props.isMinimized) {
            return;
        }

        this._processKey(event.which);
    }

    _processKey(key) {
        const {
            selectNextTrack,
            selectPrevTrack,
            selectedTrack,
            playTrack,
            pauseTrack
        } = this.props;

        switch (key) {
            case keyboard.DOWN:
                selectNextTrack();
                break;

            case keyboard.UP:
                selectPrevTrack();
                break;

            case keyboard.ENTER:
                if (selectedTrack) {
                    playTrack(selectedTrack.id);
                }
                break;

            case keyboard.SPACE:
                if (selectedTrack) {
                    if (selectedTrack.isPlay) {
                        pauseTrack();
                    } else {
                        selectedTrack.isCurrent ? playTrack() : playTrack(selectedTrack.id);
                    }
                }
                break;
        }
    }

    _handleTrackClick(id) {
        this.props.selectTrack(id);
    }

    _handleTrackDoubleClick(id) {
        this.props.playTrack(id);
    }

    _handleTrackContextMenu(track) {
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
                label: intl.formatMessage({ id: 'trackMenu.clipboard' }),
                click: () => clipboard.writeText(`${track.artist} - ${track.title}`)
            })
        );
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

    render() {
        const {
            tracks,
            trackCount,
            totalDuration,
            loadTracksFromDrop,
            isLoading
        } = this.props;

        if (trackCount) {
            return (
                <div>
                    <TrackList
                        tracks={tracks}
                        onTrackClick={this._handleTrackClick}
                        onTrackDoubleClick={this._handleTrackDoubleClick}
                        onTrackContextMenu={this._handleTrackContextMenu}
                    />
                    <Footer
                        trackCount={trackCount}
                        totalDuration={totalDuration}
                    />
                </div>
            );
        }

        if (isLoading) {
            return (
                <Loading />
            );
        }

        return (
            <DropArea onDropEnd={loadTracksFromDrop} />
        );
    }

}

function mapStateToProps(state) {
    return {
        tracks: state.tracks,
        trackCount: getCount(state),
        totalDuration: getTotalDuration(state),
        selectedTrack: getSelectedTrack(state),
        isMinimized: state.settings.minimize,
        isLoading: state.status.loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTracksFromDrop,
        removeTrack,
        playTrack,
        pauseTrack,
        selectTrack,
        selectNextTrack,
        selectPrevTrack
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(TrackListContainer));

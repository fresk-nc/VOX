import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { injectIntl } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';

import { getTotalDuration, getCount, getSelectedTracks, getCurrentTrack } from 'selectors/tracks';
import player from 'lib/player';
import {
    loadTracksFromDrop,
    removeTracks,
    playTrack,
    pauseTrack,
    selectTrack,
    selectNextTrack,
    selectPrevTrack,
    selectRangeTracks,
    setRootOfSelection,
    unsetRootOfSelection,
    moveUpSelection,
    moveDownSelection
} from 'actions';
import keyboard from 'constants/KeyboardCodes';
import Track from 'records/Track';

import DropArea from 'components/DropArea';
import TrackList from 'components/TrackList';
import Footer from 'components/Footer';
import Loading from 'components/Loading';

const DELAY_BEFORE_SHOW_CONTEXT_MENU = 50;
const { Menu, MenuItem, getCurrentWindow, shell, clipboard } = require('electron').remote;

export class TrackListContainer extends React.Component {

    static displayName = 'TrackListContainer';

    static propTypes = {
        tracks: React.PropTypes.instanceOf(List),
        currentTrack: React.PropTypes.instanceOf(Track),
        trackCount: React.PropTypes.number.isRequired,
        totalDuration: React.PropTypes.number.isRequired,
        selectedTracks: React.PropTypes.instanceOf(List).isRequired,
        isMinimized: React.PropTypes.bool.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        intl: React.PropTypes.object.isRequired,

        loadTracksFromDrop: React.PropTypes.func.isRequired,
        removeTracks: React.PropTypes.func.isRequired,
        playTrack: React.PropTypes.func.isRequired,
        pauseTrack: React.PropTypes.func.isRequired,
        selectTrack: React.PropTypes.func.isRequired,
        selectNextTrack: React.PropTypes.func.isRequired,
        selectPrevTrack: React.PropTypes.func.isRequired,
        selectRangeTracks: React.PropTypes.func.isRequired,
        setRootOfSelection: React.PropTypes.func.isRequired,
        unsetRootOfSelection: React.PropTypes.func.isRequired,
        moveUpSelection: React.PropTypes.func.isRequired,
        moveDownSelection: React.PropTypes.func.isRequired
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
        window.addEventListener('keyup', this._handleWindowKeyUp.bind(this), false);
    }

    _handleWindowKeyUp(event) {
        if (event.which === keyboard.SHIFT) {
            this.props.unsetRootOfSelection();
        }
    }

    _handleWindowKeyDown(event) {
        event.preventDefault();

        const {
            selectNextTrack,
            selectPrevTrack,
            isMinimized,
            setRootOfSelection,
            moveDownSelection,
            moveUpSelection
        } = this.props;
        let track;

        switch (event.which) {
            case keyboard.DOWN:
                if (!isMinimized) {
                    if (event.shiftKey) {
                        moveDownSelection();
                    } else {
                        selectNextTrack();
                    }
                }
                break;

            case keyboard.UP:
                if (!isMinimized) {
                    if (event.shiftKey) {
                        moveUpSelection();
                    } else {
                        selectPrevTrack();
                    }
                }
                break;

            case keyboard.ENTER:
                this._handlePressEnter();
                break;

            case keyboard.SPACE:
                track = this._getTrackForProcessSpace();
                if (track) {
                    this._handlePressSpace(track);
                }
                break;

            case keyboard.SHIFT:
                if (!isMinimized) {
                    setRootOfSelection();
                }
                break;
        }
    }

    _handlePressEnter() {
        const { selectedTracks, playTrack, tracks } = this.props;

        let track = tracks.first();

        if (selectedTracks.size) {
            track = selectedTracks.first();
        }

        if (track) {
            playTrack(track.id);
        }
    }

    _getTrackForProcessSpace() {
        const { selectedTracks, currentTrack, tracks } = this.props;

        if (currentTrack) {
            return currentTrack;
        }

        if (selectedTracks.size) {
            return selectedTracks.first();
        }

        return tracks.first();
    }

    _handlePressSpace(track) {
        const { playTrack, pauseTrack } = this.props;

        if (track.isPlay) {
            pauseTrack();
        } else {
            track.isCurrent ? playTrack() : playTrack(track.id);
        }
    }

    _handleTrackClick(event, id) {
        const { selectTrack, selectRangeTracks } = this.props;

        if (event.shiftKey) {
            selectRangeTracks(id);
            return;
        }

        selectTrack(id, {
            resetSelected: !event.metaKey
        });
    }

    _handleTrackDoubleClick(id) {
        this.props.playTrack(id);
    }

    _handleTrackContextMenu(track) {
        this.props.selectTrack(track.id, {
            resetSelected: !track.isSelected
        });

        _.delay(() => {
            this._showContextMenu();
        }, DELAY_BEFORE_SHOW_CONTEXT_MENU);
    }

    _showContextMenu() {
        const { playTrack, removeTracks, selectedTracks, intl } = this.props;
        const firstSelectedTrack = selectedTracks.first();
        const menu = new Menu();

        if (selectedTracks.size > 1) {
            const totalDuration = selectedTracks.reduce((total, track) => {
                return total += track.duration;
            }, 0);
            const momentDuration = moment.duration(totalDuration, 'seconds');

            menu.append(
                new MenuItem({
                    label: intl.formatMessage({
                        id: 'footer.total'
                    }, {
                        totalCount: selectedTracks.size,
                        min: momentDuration.minutes(),
                        sec: momentDuration.seconds()
                    })
                })
            );
        } else {
            menu.append(
                new MenuItem({
                    label: intl.formatMessage({ id: 'trackMenu.play' }),
                    click: () => playTrack(firstSelectedTrack.id)
                })
            );
        }

        menu.append(new MenuItem({ type: 'separator' }));

        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.clipboard' }),
                click: () => {
                    clipboard.writeText(
                        selectedTracks
                            .toJS()
                            .map((track) => `${track.artist} - ${track.title}`)
                            .join(' ')
                    );
                }
            })
        );

        if (selectedTracks.size === 1) {
            menu.append(
                new MenuItem({
                    label: intl.formatMessage({ id: 'trackMenu.show.darwin' }),
                    click: () => shell.showItemInFolder(firstSelectedTrack.src)
                })
            );
        }

        menu.append(new MenuItem({ type: 'separator' }));

        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.remove' }),
                click: () => {
                    removeTracks(
                        selectedTracks.toJS().map((track) => track.id)
                    );
                }
            })
        );

        menu.append(
            new MenuItem({
                label: intl.formatMessage({ id: 'trackMenu.removeWithFile' }),
                click: () => {
                    removeTracks(
                        selectedTracks.toJS().map((track) => track.id)
                    );
                    selectedTracks.forEach((track) => {
                        shell.moveItemToTrash(track.src);
                    });
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
        currentTrack: getCurrentTrack(state),
        trackCount: getCount(state),
        totalDuration: getTotalDuration(state),
        selectedTracks: getSelectedTracks(state),
        isMinimized: state.settings.minimize,
        isLoading: state.status.loading
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTracksFromDrop,
        removeTracks,
        playTrack,
        pauseTrack,
        selectTrack,
        selectNextTrack,
        selectPrevTrack,
        selectRangeTracks,
        setRootOfSelection,
        unsetRootOfSelection,
        moveUpSelection,
        moveDownSelection
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(TrackListContainer));

import types from 'constants/ActionTypes';
import trackLoader from 'lib/trackLoader';
import trackCleaner from 'lib/trackCleaner';
import notifications from 'lib/notifications';
import player from 'lib/player';
import windowResizer from 'lib/windowResizer';
import playerErrorReporter from 'lib/playerErrorReporter';

export function loadTracks() {
    return (dispatch) => {
        return trackLoader.loadFromDialog().then((tracks) => {
            loadTracksSuccess(dispatch, tracks);
        });
    };
}

export function loadTracksFromDrop(files) {
    return (dispatch) => {
        return trackLoader.loadFromDrop(files).then((tracks) => {
            loadTracksSuccess(dispatch, tracks);
        });
    };
}

function loadTracksSuccess(dispatch, tracks) {
    if (tracks.length) {
        player.addTracks(tracks);
        dispatch({ type: types.LOAD_TRACKS_SUCCESS, tracks });
    }
}

export function clearTracks() {
    return (dispatch) => {
        trackCleaner.tryClean(() => {
            player.pause();
            player.clearTrackList();
            dispatch({ type: types.CLEAR_TRACKS });
        });
    };
}

export function removeTrack(id) {
    return (dispatch) => {
        player.removeTrack(id);
        dispatch({ type: types.REMOVE_TRACK, id });
    };
}

export function playTrack(id) {
    return (dispatch) => {
        player.play(id);

        if (!id) {
            id = player.getCurrentTrackId();
        }

        dispatch({ type: types.PLAY_TRACK, id });
    };
}

export function pauseTrack() {
    return (dispatch) => {
        player.pause();
        dispatch({ type: types.PAUSE_TRACK, id: player.getCurrentTrackId() });
    };
}

export function nextTrack() {
    return (dispatch) => {
        player.next();
        notifications.nextTrack(player.getCurrentTrack());
        dispatch({ type: types.PLAY_TRACK, id: player.getCurrentTrackId() });
    };
}

export function prevTrack() {
    return (dispatch) => {
        player.prev();
        dispatch({ type: types.PLAY_TRACK, id: player.getCurrentTrackId() });
    };
}

export function toggleMinimize(minimize) {
    return (dispatch) => {
        if (minimize) {
            windowResizer.expand();
        } else {
            windowResizer.collapse();
        }

        dispatch({ type: types.TOGGLE_MINIMIZE });
    };
}

export function toggleShuffle(shuffle) {
    return (dispatch) => {
        if (shuffle) {
            player.shuffleOff();
        } else {
            player.shuffleOn();
        }
        dispatch({ type: types.TOGGLE_SHUFFLE });
    };
}

export function changeLoopMode(loopMode) {
    return (dispatch) => {
        player.changeLoopMode(loopMode);
        dispatch({ type: types.CHANGE_LOOP_MODE, loopMode });
    };
}

export function changeVolume(volume) {
    return (dispatch) => {
        player.changeVolume(volume);
        dispatch({ type: types.CHANGE_VOLUME, volume });
    };
}

export function reportPlayerError(src, id) {
    return (dispatch) => {
        playerErrorReporter.report(src, () => {
            removeTrack(id)(dispatch);
        });
    };
}

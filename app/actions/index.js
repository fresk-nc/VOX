import types from 'constants/ActionTypes';
import { load } from 'lib/tracksLoader';
import { showMessageBox } from 'lib/dialog';
import player from 'lib/player';

export function loadTracks() {
    return (dispatch) => {
        load().then((tracks) => {
            if (tracks.length) {
                player.addTracks(tracks);
                dispatch({ type: types.LOAD_TRACKS_SUCCESS, tracks });
            }
        });
    };
}

export function clearTracks() {
    return (dispatch) => {
        const clearId = 0;
        const cancelId = 1;

        showMessageBox({
            buttons: ['Clear', 'Cancel'],
            cancelId: cancelId,
            message: 'Are you sure you want to clear playlist?',
            detail: 'This operation can\'t be undone'
        }, (buttonIndex) => {
            if (buttonIndex === clearId) {
                player.pause();
                player.clearTrackList();
                dispatch({ type: types.CLEAR_TRACKS });
            }
        });
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
    }
}

export function nextTrack() {
    return (dispatch) => {
        player.next();
        dispatch({ type: types.PLAY_TRACK, id: player.getCurrentTrackId() })
    }
}

export function prevTrack() {
    return (dispatch) => {
        player.prev();
        dispatch({ type: types.PLAY_TRACK, id: player.getCurrentTrackId() })
    }
}

export function toggleMinimize(minimize) {
    return { type: types.TOGGLE_MINIMIZE, minimize };
}

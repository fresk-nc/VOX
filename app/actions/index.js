import types from 'constants/ActionTypes';
import { loadFromDialog, loadFromDrop } from 'lib/trackLoader';
import { tryClean } from 'lib/trackCleaner';
import player from 'lib/player';

export function loadTracks() {
    return (dispatch) => {
        loadFromDialog().then((tracks) => {
            loadTracksSuccess(dispatch, tracks);
        });
    };
}

export function loadTracksFromDrop(files) {
    return (dispatch) => {
        loadFromDrop(files).then((tracks) => {
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
        tryClean(() => {
            player.pause();
            player.clearTrackList();
            dispatch({ type: types.CLEAR_TRACKS });
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
    };
}

export function nextTrack() {
    return (dispatch) => {
        player.next();
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
    return { type: types.TOGGLE_MINIMIZE, minimize };
}

export function toggleShuffle(shuffle) {
    return (dispatch) => {
        if (shuffle) {
            player.shuffleOff();
        } else {
            player.shuffleOn();
        }
        dispatch({ type: types.TOGGLE_SHUFFLE, shuffle });
    };
}

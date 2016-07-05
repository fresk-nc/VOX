import types from 'constants/ActionTypes';
import trackLoader from 'lib/trackLoader';
import trackCleaner from 'lib/trackCleaner';
import notifications from 'lib/notifications';
import player from 'lib/player';
import playerErrorReporter from 'lib/playerErrorReporter';

function loadTracksSuccess(dispatch, tracks) {
    player.addTracks(tracks);
    dispatch({ type: types.LOAD_TRACKS_SUCCESS, tracks });
}

export function loadTracks() {
    return (dispatch) => {
        dispatch({ type: types.LOAD_TRACKS });

        return trackLoader.loadFromDialog().then((tracks) => {
            loadTracksSuccess(dispatch, tracks);
        });
    };
}

export function loadTracksFromDrop(files) {
    return (dispatch) => {
        dispatch({ type: types.LOAD_TRACKS });

        return trackLoader.loadFromDrop(files).then((tracks) => {
            loadTracksSuccess(dispatch, tracks);
        });
    };
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

export function removeTracks(ids) {
    return (dispatch) => {
        player.removeTracks(ids);
        dispatch({ type: types.REMOVE_TRACKS, ids });
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

export function selectTrack(id, options) {
    return { type: types.SELECT_TRACK, id, options };
}

export function selectNextTrack() {
    return { type: types.SELECT_NEXT_TRACK };
}

export function selectPrevTrack() {
    return { type: types.SELECT_PREV_TRACK };
}

export function selectRangeTracks(id) {
    return { type: types.SELECT_RANGE_TRACKS, id };
}

export function reportPlayerError(src, id) {
    return (dispatch) => {
        playerErrorReporter.report(src, () => {
            removeTracks([ id ])(dispatch);
        });
    };
}

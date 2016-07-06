import keyMirror from 'keymirror';

export default keyMirror({
    LOAD_TRACKS: null,
    LOAD_TRACKS_SUCCESS: null,
    CLEAR_TRACKS: null,
    REMOVE_TRACKS: null,

    PLAY_TRACK: null,
    PAUSE_TRACK: null,
    NEXT_TRACK: null,
    PREV_TRACK: null,

    SELECT_TRACK: null,
    SELECT_NEXT_TRACK: null,
    SELECT_PREV_TRACK: null,
    SELECT_RANGE_TRACKS: null,

    // selection with shift+up/down
    SET_ROOT_OF_SELECTION: null,
    UNSET_ROOT_OF_SELECTION: null,
    MOVE_UP_SELECTION: null,
    MOVE_DOWN_SELECTION: null
});

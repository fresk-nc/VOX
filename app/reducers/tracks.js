import types from 'constants/ActionTypes';
import { List } from 'immutable';
import Track from 'records/Track';

export default function tracks(state = List(), action) {
    switch (action.type) {

        case types.LOAD_TRACKS_SUCCESS:
            return state.concat(
                List(action.tracks.map((track) => new Track(track)))
            );

        case types.CLEAR_TRACKS:
            return state.clear();

        case types.REMOVE_TRACK:
            return state.filter((track) => track.id !== action.id);

        case types.PLAY_TRACK:
            return state.map((track) => {
                if (track.id === action.id) {
                    return track.merge({
                        isPlay: true,
                        isCurrent: true
                    });
                }

                return track.merge({
                    isPlay: false,
                    isCurrent: false
                });
            });

        case types.PAUSE_TRACK:
            return state.map((track) => {
                if (track.id === action.id) {
                    return track.set('isPlay', false);
                }

                return track;
            });

        default:
            return state;
    }
}

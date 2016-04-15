import types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';

export default function tracks(state = List(), action) {
    switch(action.type) {

        case types.LOAD_TRACKS_SUCCESS:
            return state.concat(fromJS(action.tracks));

        case types.CLEAR_TRACKS:
            return state.clear();

        case types.PLAY_TRACK:
            return state.map((track) => {
                if (track.get('id') === action.id) {
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
                if (track.get('id') === action.id) {
                    return track.set('isPlay', false);
                }

                return track;
            });

        default:
            return state;
    }
}

export function getTotalDuration(state) {
    return state.reduce((total, track) => {
        return total += track.get('duration');
    }, 0);
}

export function getCurrentTrack(state) {
    return state.find((track) => {
        return track.get('isCurrent');
    });
}

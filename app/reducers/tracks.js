import types from 'constants/ActionTypes';
import { List } from 'immutable';
import Track from 'records/Track';

export default function tracks(state = List(), action) {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
}

const handlers = {
    [types.LOAD_TRACKS_SUCCESS](state, action) {
        return state.concat(
            List(action.tracks.map((track) => new Track(track)))
        );
    },

    [types.CLEAR_TRACKS](state) {
        return state.clear();
    },

    [types.REMOVE_TRACK](state, action) {
        return state.filter((track) => track.id !== action.id);
    },

    [types.PLAY_TRACK](state, action) {
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
    },

    [types.PAUSE_TRACK](state, action) {
        return state.map((track) => {
            if (track.id === action.id) {
                return track.set('isPlay', false);
            }

            return track;
        });
    },

    [types.SELECT_TRACK](state, action) {
        return state.map((track) => {
            if (track.id === action.id) {
                return track.set('isSelected', true);
            }

            return track.set('isSelected', false);
        });
    },

    [types.SELECT_NEXT_TRACK](state) {
        const selectedIndex = state.findIndex((track) => track.isSelected);

        if (selectedIndex === state.size - 1) {
            return state;
        }

        const nextIndex = (selectedIndex >= 0) ? selectedIndex + 1 : 0;

        return state.map((track, i) => {
            if (i === nextIndex) {
                return track.set('isSelected', true);
            }

            return track.set('isSelected', false);
        });
    },

    [types.SELECT_PREV_TRACK](state) {
        const selectedIndex = state.findIndex((track) => track.isSelected);

        if (selectedIndex === 0) {
            return state;
        }

        const prevIndex = (selectedIndex > 0) ? selectedIndex - 1 : state.size - 1;

        return state.map((track, i) => {
            if (i === prevIndex) {
                return track.set('isSelected', true);
            }

            return track.set('isSelected', false);
        });
    }
};

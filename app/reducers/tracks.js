import { List } from 'immutable';

import types from 'constants/ActionTypes';
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

    [types.REMOVE_TRACKS](state, action) {
        return state.filter((track) => !action.ids.includes(track.id));
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

            if (action.options.resetSelected) {
                return track.set('isSelected', false);
            }

            return track;
        });
    },

    [types.SELECT_NEXT_TRACK](state) {
        const selectedIndex = state.findLastIndex((track) => track.isSelected);

        let nextIndex = (selectedIndex >= 0) ? selectedIndex + 1 : 0;

        if (selectedIndex === state.size - 1) {
            nextIndex = state.size - 1;
        }

        return state.map((track, i) => {
            if (i === nextIndex) {
                return track.set('isSelected', true);
            }

            return track.set('isSelected', false);
        });
    },

    [types.SELECT_PREV_TRACK](state) {
        const selectedIndex = state.findIndex((track) => track.isSelected);

        let prevIndex = (selectedIndex > 0) ? selectedIndex - 1 : state.size - 1;

        if (selectedIndex === 0) {
            prevIndex = 0;
        }

        return state.map((track, i) => {
            if (i === prevIndex) {
                return track.set('isSelected', true);
            }

            return track.set('isSelected', false);
        });
    },

    [types.SELECT_RANGE_TRACKS](state, action) {
        const selectedIndex = state.findIndex((track) => track.isSelected);
        const points = [
            (selectedIndex > -1) ? selectedIndex : 0,
            state.findIndex((track) => track.id === action.id)
        ];

        let startIndex = points[0];
        let stopIndex = points[1];

        if (startIndex > stopIndex) {
            startIndex = points[1];
            stopIndex = points[0];
        }

        return state.map((track, i) => {
            if (i >= startIndex && i <= stopIndex) {
                return track.set('isSelected', true);
            }

            return track;
        });
    },

    [types.SET_ROOT_OF_SELECTION](state) {
        if (!state.size) {
            return state;
        }

        const selectedIndex = state.findIndex((track) => track.isSelected);
        const rootIndex = (selectedIndex > -1) ? selectedIndex : 0;

        return state.update(rootIndex, (track) => track.set('rootOfSelection', true));
    },

    [types.UNSET_ROOT_OF_SELECTION](state) {
        return state.map((track) => {
            if (track.rootOfSelection) {
                return track.set('rootOfSelection', false);
            }

            return track;
        });
    },
    
    [types.MOVE_DOWN_SELECTION](state) {
        if (!state.size) {
            return state;
        }

        const rootIndex = state.findIndex((track) => track.rootOfSelection);
        const rootTrack = state.get(rootIndex);

        if (!rootTrack.isSelected) {
            return state.update(rootIndex, (track) => track.set('isSelected', true));
        }

        if (rootIndex !== 0) {
            const prevTrack = state.get(rootIndex - 1);

            if (prevTrack.isSelected) {
                return state.update(
                    state.findIndex((track) => track.isSelected),
                    (track) => track.set('isSelected', false)
                );
            }
        }

        const lastSelectedIndex = state.findLastIndex((track) => track.isSelected);

        if (lastSelectedIndex === state.size - 1) {
            return state;
        }

        return state.update(lastSelectedIndex + 1, (track) => track.set('isSelected', true));
    },

    [types.MOVE_UP_SELECTION](state) {
        if (!state.size) {
            return state;
        }

        const rootIndex = state.findIndex((track) => track.rootOfSelection);
        const rootTrack = state.get(rootIndex);

        if (!rootTrack.isSelected) {
            return state.map((track) => track.set('isSelected', true));
        }

        if (rootIndex !== state.size - 1) {
            const nextTrack = state.get(rootIndex + 1);

            if (nextTrack.isSelected) {
                return state.update(
                    state.findLastIndex((track) => track.isSelected),
                    (track) => track.set('isSelected', false)
                );
            }
        }

        const firstSelectedIndex = state.findIndex((track) => track.isSelected);

        if (firstSelectedIndex === 0) {
            return state;
        }

        return state.update(firstSelectedIndex - 1, (track) => track.set('isSelected', true));
    }
};

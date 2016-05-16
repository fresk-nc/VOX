import types from 'constants/ActionTypes';
import { Map } from 'immutable';

const initState = Map({
    minimize: false,
    shuffle: false,
    loopMode: 'off',
    volume: 1
});

export default function settings(state = initState, action) {
    switch (action.type) {

        case types.TOGGLE_MINIMIZE:
            return state.update('minimize', (v) => !v);

        case types.TOGGLE_SHUFFLE:
            return state.update('shuffle', (v) => !v);

        case types.CHANGE_LOOP_MODE:
            return state.set('loopMode', action.loopMode);

        case types.CHANGE_VOLUME:
            return state.set('volume', action.volume);

        default:
            return state;
    }
}

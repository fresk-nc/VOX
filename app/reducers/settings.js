import types from 'constants/ActionTypes';
import { Map } from 'immutable';

const initState = Map({
    minimize: false,
    shuffle: false,
    loopMode: 'off'
});

export default function settings(state = initState, action) {
    switch (action.type) {

        case types.TOGGLE_MINIMIZE:
            return state.set('minimize', !action.minimize);

        case types.TOGGLE_SHUFFLE:
            return state.set('shuffle', !action.shuffle);

        case types.CHANGE_LOOP_MODE:
            return state.set('loopMode', action.loopMode);

        default:
            return state;
    }
}

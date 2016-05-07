import types from 'constants/ActionTypes';
import { Map } from 'immutable';

const initState = Map({
    minimize: false,
    shuffle: false
});

export default function settings(state = initState, action) {
    switch (action.type) {

        case types.TOGGLE_MINIMIZE:
            return state.set('minimize', !action.minimize);

        case types.TOGGLE_SHUFFLE:
            return state.set('shuffle', !action.shuffle);

        default:
            return state;
    }
}

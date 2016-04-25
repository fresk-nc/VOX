import types from 'constants/ActionTypes';
import { Map } from 'immutable';

const initState = Map({
    minimize: false
});

export default function settings(state = initState, action) {
    switch (action.type) {

        case types.TOGGLE_MINIMIZE:
            return state.set('minimize', !action.minimize);

        default:
            return state;
    }
}

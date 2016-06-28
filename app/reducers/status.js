import types from 'constants/ActionTypes';
import Status from 'records/Status';

export default function status(state = new Status(), action) {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
}

const handlers = {
    [types.REHYDRATE_SUCCESS](state) {
        return state.set('rehydrated', true);
    }
};

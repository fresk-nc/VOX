import types from 'constants/ActionTypes';

export default function informer(state = '', action) {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
}

const handlers = {
    [types.UPDATE_INFORMER](state, action) {
        return action.text;
    },

    [types.RESET_INFORMER]() {
        return '';
    }
};

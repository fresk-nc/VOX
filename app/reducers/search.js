import types from 'constants/ActionTypes';
import Search from 'records/Search';

export default function search(state = new Search(), action) {
    if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
    } else {
        return state;
    }
}

const handlers = {
    [types.SET_SEARCH_TEXT](state, action) {
        return state.set('text', action.text);
    },

    [types.SHOW_SEARCH](state) {
        return state.set('isShowed', true);
    },

    [types.HIDE_SEARCH](state) {
        return state.set('isShowed', false);
    }
};

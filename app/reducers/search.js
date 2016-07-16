import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';
import Search from 'records/Search';

export default createReducer(new Search(), {
    [types.SET_SEARCH_TEXT](state, action) {
        return state.set('text', action.text);
    },

    [types.SHOW_SEARCH](state) {
        return state.set('isShowed', true);
    },

    [types.HIDE_SEARCH](state) {
        return state.set('isShowed', false);
    }
});

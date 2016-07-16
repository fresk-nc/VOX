import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';
import Status from 'records/Status';

export default createReducer(new Status(), {
    [types.REHYDRATE_SUCCESS](state) {
        return state.set('rehydrated', true);
    },

    [types.LOAD_TRACKS](state) {
        return state.set('loading', true);
    },

    [types.LOAD_TRACKS_SUCCESS](state) {
        return state.set('loading', false);
    }
});

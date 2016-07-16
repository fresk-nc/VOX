import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';
import Settings from 'records/Settings';

export default createReducer(new Settings(), {
    [types.TOGGLE_MINIMIZE](state) {
        return state.update('minimize', (v) => !v);
    },

    [types.TOGGLE_SHUFFLE](state) {
        return state.update('shuffle', (v) => !v);
    },

    [types.CHANGE_LOOP_MODE](state, action) {
        return state.set('loopMode', action.loopMode);
    },

    [types.CHANGE_VOLUME](state, action) {
        return state.set('volume', action.volume);
    }
});

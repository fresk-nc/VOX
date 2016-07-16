import createReducer from 'utils/createReducer';
import types from 'constants/ActionTypes';

export default createReducer('', {
    [types.UPDATE_INFORMER](state, action) {
        return action.text;
    },

    [types.RESET_INFORMER]() {
        return '';
    }
});

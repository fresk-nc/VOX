import types from 'constants/ActionTypes';

const DELAY_BEFORE_RESET = 2000;

let timerId = null;

export function updateInformer(text) {
    return (dispatch) => {
        clearTimeout(timerId);

        dispatch({ type: types.UPDATE_INFORMER, text });

        timerId = setTimeout(() => {
            dispatch({ type: types.RESET_INFORMER });
        }, DELAY_BEFORE_RESET);
    };
}

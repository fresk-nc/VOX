import types from 'constants/ActionTypes';

export function setSearchText(text) {
    return { type: types.SET_SEARCH_TEXT, text };
}

export function showSearch() {
    return { type: types.SHOW_SEARCH };
}

export function hideSearch() {
    return { type: types.HIDE_SEARCH };
}

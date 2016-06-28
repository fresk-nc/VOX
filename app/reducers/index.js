import { combineReducers } from 'redux';
import tracks from './tracks';
import settings from './settings';
import search from './search';
import status from './status';

export default combineReducers({
    tracks,
    settings,
    search,
    status
});

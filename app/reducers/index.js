import { combineReducers } from 'redux';
import tracks from './tracks';
import settings from './settings';
import search from './search';
import status from './status';
import informer from './informer';

export default combineReducers({
    tracks,
    settings,
    search,
    status,
    informer
});

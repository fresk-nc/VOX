import { combineReducers } from 'redux';
import tracks from './tracks';
import settings from './settings';
import search from './search';

export default combineReducers({
    tracks,
    settings,
    search
});

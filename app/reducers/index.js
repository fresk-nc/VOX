import { combineReducers } from 'redux';
import tracks from './tracks';
import settings from './settings';

export default combineReducers({
    tracks,
    settings
});

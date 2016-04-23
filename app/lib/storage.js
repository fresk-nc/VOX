import persistState from 'redux-localstorage';
import { fromJS } from 'immutable';

export default () => {
    return persistState(null, {
        key: 'vox',
        deserialize: (serializedData) => {
            const data = JSON.parse(serializedData);
            return {
                tracks: fromJS(data.tracks).map((track) => {
                    return track.set('isPlay', false);
                }),
                settings: fromJS(data.settings)
            }
        }
    });
}

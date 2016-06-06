import { createSelector } from 'reselect';

const getTracks = (state) => state.tracks;

export const getTotalDuration = createSelector(
    getTracks,
    (tracks) => {
        return tracks.reduce((total, track) => {
            return total += track.duration;
        }, 0);
    }
);

export const getCurrentTrack = createSelector(
    getTracks,
    (tracks) => {
        return tracks.find((track) => {
            return track.isCurrent;
        });
    }
);

export const getCount = createSelector(
    getTracks,
    (tracks) => {
        return tracks.size;
    }
);

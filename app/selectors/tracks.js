import { createSelector } from 'reselect';
import { List } from 'immutable';

const getTracks = (state) => state.tracks;
const getSearchText = (state) => state.search.text;

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

export const getSelectedTrack = createSelector(
    getTracks,
    (tracks) => {
        return tracks.find((track) => {
            return track.isSelected;
        });
    }
);

export const getCount = createSelector(
    getTracks,
    (tracks) => {
        return tracks.size;
    }
);

export const searchTracks = createSelector(
    [ getTracks, getSearchText ],
    (tracks, searchText) => {
        if (!searchText) {
            return List();
        }

        const lowerSearchText = searchText.toLowerCase();

        return tracks.filter((track) => (
            track.title.toLowerCase().includes(lowerSearchText) ||
            track.artist.toLowerCase().includes(lowerSearchText) ||
            track.album.toLowerCase().includes(lowerSearchText)
        ));
    }
);

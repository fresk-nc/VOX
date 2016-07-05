import types from 'constants/ActionTypes';
import player from 'lib/player';
import windowResizer from 'lib/windowResizer';

export function toggleMinimize(minimize) {
    return (dispatch) => {
        if (minimize) {
            windowResizer.expand();
        } else {
            windowResizer.collapse();
        }

        dispatch({ type: types.TOGGLE_MINIMIZE });
    };
}

export function toggleShuffle(shuffle) {
    return (dispatch) => {
        if (shuffle) {
            player.shuffleOff();
        } else {
            player.shuffleOn();
        }
        dispatch({ type: types.TOGGLE_SHUFFLE });
    };
}

export function changeLoopMode(loopMode) {
    return (dispatch) => {
        player.changeLoopMode(loopMode);
        dispatch({ type: types.CHANGE_LOOP_MODE, loopMode });
    };
}

export function changeVolume(volume) {
    return (dispatch) => {
        player.changeVolume(volume);
        dispatch({ type: types.CHANGE_VOLUME, volume });
    };
}

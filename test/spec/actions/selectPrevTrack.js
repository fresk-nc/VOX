import { selectPrevTrack } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('selectPrevTrack', () => {
        it('should create SELECT_PREV_TRACK action', function() {
            expect(selectPrevTrack()).to.be.eql({ type: types.SELECT_PREV_TRACK });
        });
    });
});

import { selectNextTrack } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('selectNextTrack', () => {
        it('should create SELECT_NEXT_TRACK action', function() {
            expect(selectNextTrack()).to.be.eql({ type: types.SELECT_NEXT_TRACK });
        });
    });
});

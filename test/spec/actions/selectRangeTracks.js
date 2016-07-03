import { selectRangeTracks } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('selectRangeTracks', () => {
        it('should create SELECT_RANGE_TRACKS action', function() {
            expect(selectRangeTracks(111)).to.be.eql({
                type: types.SELECT_RANGE_TRACKS,
                id: 111
            });
        });
    });
});

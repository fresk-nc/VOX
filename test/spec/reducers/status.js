import status from 'reducers/status';
import types from 'constants/ActionTypes';
import Status from 'records/Status';

describe('reducers', () => {
    describe('status', () => {
        it('should handle initial state', () => {
            expect(status(undefined, {})).to.be.equal(new Status());
        });

        it('should handle REHYDRATE_SUCCESS', () => {
            expect(status(new Status(), { type: types.REHYDRATE_SUCCESS }))
                .to.be.equal(new Status({ rehydrated: true }));
        });

        it('should handle LOAD_TRACKS', () => {
            expect(status(new Status(), { type: types.LOAD_TRACKS }))
                .to.be.equal(new Status({ loading: true }));
        });

        it('should handle LOAD_TRACKS_SUCCESS', () => {
            expect(status(new Status(), { type: types.LOAD_TRACKS_SUCCESS }))
                .to.be.equal(new Status({ loading: false }));
        });
    });
});

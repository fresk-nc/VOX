import { rehydrateSuccess } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('app', () => {
        describe('rehydrateSuccess', () => {
            it('should create REHYDRATE_SUCCESS action', function() {
                expect(rehydrateSuccess()).to.be.eql({ type: types.REHYDRATE_SUCCESS });
            });
        });
    });
});

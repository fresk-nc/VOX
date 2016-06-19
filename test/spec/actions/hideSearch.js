import { hideSearch } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('hideSearch', () => {
        it('should create HIDE_SEARCH action', function() {
            expect(hideSearch()).to.be.eql({ type: types.HIDE_SEARCH });
        });
    });
});

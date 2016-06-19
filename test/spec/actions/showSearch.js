import { showSearch } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('showSearch', () => {
        it('should create SHOW_SEARCH action', function() {
            expect(showSearch()).to.be.eql({ type: types.SHOW_SEARCH });
        });
    });
});

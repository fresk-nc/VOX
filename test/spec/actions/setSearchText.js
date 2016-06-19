import { setSearchText } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('setSearchText', () => {
        it('should create SET_SEARCH_TEXT action', function() {
            expect(setSearchText('test')).to.be.eql({
                type: types.SET_SEARCH_TEXT,
                text: 'test'
            });
        });
    });
});

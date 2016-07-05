import { showSearch, hideSearch, setSearchText } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('search', () => {
        describe('showSearch', () => {
            it('should create SHOW_SEARCH action', function() {
                expect(showSearch()).to.be.eql({ type: types.SHOW_SEARCH });
            });
        });

        describe('hideSearch', () => {
            it('should create HIDE_SEARCH action', function() {
                expect(hideSearch()).to.be.eql({ type: types.HIDE_SEARCH });
            });
        });

        describe('setSearchText', () => {
            it('should create SET_SEARCH_TEXT action', function() {
                expect(setSearchText('test')).to.be.eql({
                    type: types.SET_SEARCH_TEXT,
                    text: 'test'
                });
            });
        });
    });
});

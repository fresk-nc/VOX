import search from 'reducers/search';
import types from 'constants/ActionTypes';
import Search from 'records/Search';

describe('reducers', () => {
    describe('search', () => {
        it('should handle initial state', () => {
            expect(search(undefined, {})).to.be.equal(new Search());
        });

        it('should handle SET_SEARCH_TEXT', () => {
            expect(search(new Search(), { type: types.SET_SEARCH_TEXT, text: 'test' }))
                .to.be.equal(new Search({ text: 'test' }));
        });

        it('should handle SHOW_SEARCH', () => {
            expect(search(new Search(), { type: types.SHOW_SEARCH }))
                .to.be.equal(new Search({ isShowed: true }));
        });

        it('should handle SHOW_SEARCH', () => {
            expect(search(new Search({ isShowed: true }), { type: types.HIDE_SEARCH }))
                .to.be.equal(new Search({ isShowed: false }));
        });
    });
});

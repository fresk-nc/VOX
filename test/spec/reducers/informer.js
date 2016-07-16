import informer from 'reducers/informer';
import types from 'constants/ActionTypes';

describe('reducers', () => {
    describe('informer', () => {
        it('should handle initial state', () => {
            expect(informer(undefined, {})).to.be.equal('');
        });

        it('should handle UPDATE_INFORMER', () => {
            expect(informer('text', { type: types.UPDATE_INFORMER, text: 'new text' }))
                .to.be.equal('new text');
        });

        it('should handle RESET_INFORMER', () => {
            expect(informer('text', { type: types.RESET_INFORMER })).to.be.equal('');
        });
    });
});

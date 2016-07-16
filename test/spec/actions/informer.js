import { updateInformer } from 'actions';
import types from 'constants/ActionTypes';

describe('actions', () => {
    describe('informer', () => {
        describe('updateInformer', () => {
            beforeEach(function() {
                this.dispatch = this.sinon.spy();
                this.sinon.stub(window, 'setTimeout', function(cb) {
                    cb();
                });
                this.sinon.stub(window, 'clearTimeout');
            });

            it('should clear timeout', function() {
                updateInformer('text')(this.dispatch);

                expect(window.clearTimeout).to.have.callCount(1);
            });

            it('should dispatch UPDATE_INFORMER action with right args', function() {
                updateInformer('text')(this.dispatch);

                expect(this.dispatch).to.be.calledWith({
                    type: types.UPDATE_INFORMER,
                    text: 'text'
                });
            });

            it('should dispatch RESET_INFORMER action after delay', function() {
                updateInformer('text')(this.dispatch);

                expect(this.dispatch).to.be.calledWith({ type: types.RESET_INFORMER });
            });
        });
    });
});

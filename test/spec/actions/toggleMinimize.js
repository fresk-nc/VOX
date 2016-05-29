import { toggleMinimize } from 'actions';
import types from 'constants/ActionTypes';
import windowResizer from 'lib/windowResizer';

describe('actions', () => {
    describe('toggleMinimize', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(windowResizer, 'expand');
            this.sinon.stub(windowResizer, 'collapse');
        });

        it('should expand the window', function() {
            toggleMinimize(true)(this.dispatch);

            expect(windowResizer.expand).to.have.callCount(1);
            expect(windowResizer.collapse).to.have.callCount(0);
        });

        it('should collapse the window', function() {
            toggleMinimize(false)(this.dispatch);

            expect(windowResizer.expand).to.have.callCount(0);
            expect(windowResizer.collapse).to.have.callCount(1);
        });

        it('should create TOGGLE_MINIMIZE action', function() {
            toggleMinimize()(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.TOGGLE_MINIMIZE
            });
        });
    });
});

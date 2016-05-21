import windowResizer from 'lib/windowResizer';
import config from 'config';

describe('lib', () => {
    describe('windowResizer', () => {
        describe('expand', () => {
            beforeEach(function() {
                this.sinon.stub(windowResizer, '_resize');
            });

            it('should expand the window', () => {
                windowResizer.expand();
                expect(windowResizer._resize).to.have.callCount(1);
                expect(windowResizer._resize).to.be.calledWith(config.maxSize.width, config.maxSize.height);
            });
        });

        describe('collapse', () => {
            beforeEach(function() {
                this.sinon.stub(windowResizer, '_resize');
            });

            it('should collapse the window', () => {
                windowResizer.collapse();
                expect(windowResizer._resize).to.have.callCount(1);
                expect(windowResizer._resize).to.be.calledWith(config.minSize.width, config.minSize.height);
            });
        });
    });
});

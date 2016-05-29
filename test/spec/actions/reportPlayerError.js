import { reportPlayerError } from 'actions';
import playerErrorReporter from 'lib/playerErrorReporter';

describe('actions', () => {
    describe('reportPlayerError', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(playerErrorReporter, 'report');
            playerErrorReporter.report.yields();
        });

        it('should report error', function() {
            reportPlayerError('src', 10)(this.dispatch);

            expect(playerErrorReporter.report).to.have.callCount(1);
            expect(playerErrorReporter.report).to.be.calledWith('src');
        });
    });
});

import { pauseTrack } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('pauseTrack', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'pause');
            this.sinon.stub(player, 'getCurrentTrackId').returns(10);
        });

        it('player must pause', function() {
            pauseTrack()(this.dispatch);

            expect(player.pause).to.have.callCount(1);
        });

        it('should create PAUSE_TRACK action', function() {
            pauseTrack(10)(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.PAUSE_TRACK,
                id: 10
            });
        });
    });
});

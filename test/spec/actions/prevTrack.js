import { prevTrack } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('prevTrack', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'prev');
            this.sinon.stub(player, 'getCurrentTrackId').returns(10);
        });

        it('should switch to the prev track', function() {
            prevTrack()(this.dispatch);

            expect(player.prev).to.have.callCount(1);
        });

        it('should create PLAY_TRACK action', function() {
            prevTrack()(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.PLAY_TRACK,
                id: 10
            });
        });
    });
});

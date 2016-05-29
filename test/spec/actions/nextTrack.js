import { nextTrack } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';
import notifications from 'lib/notifications';

describe('actions', () => {
    describe('nextTrack', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'next');
            this.sinon.stub(player, 'getCurrentTrack').returns({ id: 10 });
            this.sinon.stub(player, 'getCurrentTrackId').returns(10);
            this.sinon.stub(notifications, 'nextTrack');
        });

        it('should switch to the next track', function() {
            nextTrack()(this.dispatch);

            expect(player.next).to.have.callCount(1);
        });

        it('should notify about the next track', function() {
            nextTrack()(this.dispatch);

            expect(notifications.nextTrack).to.have.callCount(1);
        });

        it('should create PLAY_TRACK action', function() {
            nextTrack()(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.PLAY_TRACK,
                id: 10
            });
        });
    });
});

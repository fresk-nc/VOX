import { removeTrack } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('removeTrack', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'removeTrack');
        });

        it('should remove track from player', function() {
            removeTrack(10)(this.dispatch);

            expect(player.removeTrack).to.have.callCount(1);
            expect(player.removeTrack).to.be.calledWith(10);
        });

        it('should create REMOVE_TRACK action', function() {
            removeTrack(10)(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.REMOVE_TRACK,
                id: 10
            });
        });
    });
});

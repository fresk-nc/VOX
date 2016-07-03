import { removeTracks } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('removeTracks', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'removeTracks');
        });

        it('should remove tracks from player', function() {
            removeTracks([ 10, 11 ])(this.dispatch);

            expect(player.removeTracks).to.have.callCount(1);
            expect(player.removeTracks).to.be.calledWith([ 10, 11 ]);
        });

        it('should dispatch REMOVE_TRACKS action', function() {
            removeTracks([ 10, 11 ])(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.REMOVE_TRACKS,
                ids: [ 10, 11 ]
            });
        });
    });
});

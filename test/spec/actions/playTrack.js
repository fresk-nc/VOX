import { playTrack } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('playTrack', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'play');
            this.sinon.stub(player, 'getCurrentTrackId');
        });

        it('should start playing', function() {
            playTrack()(this.dispatch);

            expect(player.play).to.have.callCount(1);
        });

        it('should create PLAY_TRACK action', function() {
            playTrack(10)(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.PLAY_TRACK,
                id: 10
            });
        });

        it('should create PLAY_TRACK action with id from player', function() {
            player.getCurrentTrackId.returns(5);

            playTrack()(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.PLAY_TRACK,
                id: 5
            });
        });
    });
});

import { toggleShuffle } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('toggleShuffle', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'shuffleOn');
            this.sinon.stub(player, 'shuffleOff');
        });

        it('should switch on the shuffle mode', function() {
            toggleShuffle(false)(this.dispatch);

            expect(player.shuffleOn).to.have.callCount(1);
            expect(player.shuffleOff).to.have.callCount(0);
        });

        it('should switch off the shuffle mode', function() {
            toggleShuffle(true)(this.dispatch);

            expect(player.shuffleOn).to.have.callCount(0);
            expect(player.shuffleOff).to.have.callCount(1);
        });

        it('should create TOGGLE_SHUFFLE action', function() {
            toggleShuffle()(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.TOGGLE_SHUFFLE
            });
        });
    });
});

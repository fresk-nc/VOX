import { changeLoopMode } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('changeLoopMode', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'changeLoopMode');
        });

        it('player should change the loop mode', function() {
            changeLoopMode('one')(this.dispatch);

            expect(player.changeLoopMode).to.have.callCount(1);
            expect(player.changeLoopMode).to.be.calledWith('one');
        });

        it('should create CHANGE_LOOP_MODE action', function() {
            changeLoopMode('one')(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.CHANGE_LOOP_MODE,
                loopMode: 'one'
            });
        });
    });
});

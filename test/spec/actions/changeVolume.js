import { changeVolume } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';

describe('actions', () => {
    describe('changeVolume', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(player, 'changeVolume');
        });

        it('player should change the volume', function() {
            changeVolume(0.7)(this.dispatch);

            expect(player.changeVolume).to.have.callCount(1);
            expect(player.changeVolume).to.be.calledWith(0.7);
        });

        it('should create CHANGE_VOLUME action', function() {
            changeVolume(0.7)(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({
                type: types.CHANGE_VOLUME,
                volume: 0.7
            });
        });
    });
});

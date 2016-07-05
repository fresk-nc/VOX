import { toggleMinimize, toggleShuffle, changeLoopMode, changeVolume } from 'actions';
import types from 'constants/ActionTypes';
import player from 'lib/player';
import windowResizer from 'lib/windowResizer';

describe('actions', () => {
    describe('settings', () => {
        describe('toggleMinimize', () => {
            beforeEach(function() {
                this.dispatch = this.sinon.spy();
                this.sinon.stub(windowResizer, 'expand');
                this.sinon.stub(windowResizer, 'collapse');
            });

            it('should expand the window', function() {
                toggleMinimize(true)(this.dispatch);

                expect(windowResizer.expand).to.have.callCount(1);
                expect(windowResizer.collapse).to.have.callCount(0);
            });

            it('should collapse the window', function() {
                toggleMinimize(false)(this.dispatch);

                expect(windowResizer.expand).to.have.callCount(0);
                expect(windowResizer.collapse).to.have.callCount(1);
            });

            it('should dispatch TOGGLE_MINIMIZE action', function() {
                toggleMinimize()(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.TOGGLE_MINIMIZE
                });
            });
        });

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

            it('should dispatch TOGGLE_SHUFFLE action', function() {
                toggleShuffle()(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.TOGGLE_SHUFFLE
                });
            });
        });

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

            it('should dispatch CHANGE_LOOP_MODE action', function() {
                changeLoopMode('one')(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.CHANGE_LOOP_MODE,
                    loopMode: 'one'
                });
            });
        });

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

            it('should dispatch CHANGE_VOLUME action', function() {
                changeVolume(0.7)(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.CHANGE_VOLUME,
                    volume: 0.7
                });
            });
        });
    });
});

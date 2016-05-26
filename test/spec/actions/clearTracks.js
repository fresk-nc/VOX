import { clearTracks } from 'actions';
import types from 'constants/ActionTypes';
import trackCleaner from 'lib/trackCleaner';
import player from 'lib/player';

describe('actions', () => {
    describe('clearTracks', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(trackCleaner, 'tryClean');
            this.sinon.stub(player, 'pause');
            this.sinon.stub(player, 'clearTrackList');

            trackCleaner.tryClean.yields();
        });

        it('player must pause', function() {
            clearTracks()(this.dispatch);

            expect(player.pause).to.have.callCount(1);
        });

        it('should clear track list of player', function() {
            clearTracks()(this.dispatch);

            expect(player.clearTrackList).to.have.callCount(1);
        });

        it('should create CLEAR_TRACKS action', function() {
            clearTracks()(this.dispatch);

            expect(this.dispatch).to.have.callCount(1);
            expect(this.dispatch).to.be.calledWith({ type: types.CLEAR_TRACKS });
        });
    });
});

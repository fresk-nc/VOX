import { loadTracks } from 'actions';
import types from 'constants/ActionTypes';
import trackLoader from 'lib/trackLoader';
import player from 'lib/player';

describe('actions', () => {
    describe('loadTracks', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(trackLoader, 'loadFromDialog');
            this.sinon.stub(player, 'addTracks');
        });

        it('should call trackLoader.loadFromDialog', function() {
            trackLoader.loadFromDialog.returns(Promise.resolve([]));

            return loadTracks()(this.dispatch).then(() => {
                expect(trackLoader.loadFromDialog).to.have.callCount(1);
            });
        });

        it('should add tracks to the player when they added into the dialog', function() {
            const tracks = [ 'track1', 'track2' ];

            trackLoader.loadFromDialog.returns(Promise.resolve(tracks));

            return loadTracks()(this.dispatch).then(() => {
                expect(player.addTracks).to.have.callCount(1);
                expect(player.addTracks).to.be.calledWith(tracks);
            });
        });

        it('should create LOAD_TRACKS_SUCCESS action when tracks is added into the dialog', function() {
            const tracks = [ 'track1', 'track2' ];

            trackLoader.loadFromDialog.returns(Promise.resolve(tracks));

            return loadTracks()(this.dispatch).then(() => {
                expect(this.dispatch).to.be.calledWith({
                    type: types.LOAD_TRACKS_SUCCESS,
                    tracks
                });
            });
        });

    });
});

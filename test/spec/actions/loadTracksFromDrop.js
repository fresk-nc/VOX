import { loadTracksFromDrop } from 'actions';
import types from 'constants/ActionTypes';
import trackLoader from 'lib/trackLoader';
import player from 'lib/player';

describe('actions', () => {
    describe('loadTracksFromDrop', () => {
        beforeEach(function() {
            this.dispatch = this.sinon.spy();
            this.sinon.stub(trackLoader, 'loadFromDrop');
            this.sinon.stub(player, 'addTracks');
        });

        it('should call trackLoader.loadFromDrop with right args', function() {
            const files = [ 'file1', 'file2' ];

            trackLoader.loadFromDrop.returns(Promise.resolve([]));

            return loadTracksFromDrop(files)(this.dispatch).then(() => {
                expect(trackLoader.loadFromDrop).to.have.callCount(1);
                expect(trackLoader.loadFromDrop).to.be.calledWith(files);
            });
        });

        it('should not add tracks to the player when nothing is added from drop', function() {
            trackLoader.loadFromDrop.returns(Promise.resolve([]));

            return loadTracksFromDrop([])(this.dispatch).then(() => {
                expect(player.addTracks).to.have.callCount(0);
            });
        });

        it('should not create LOAD_TRACKS_SUCCESS action when nothing is added from drop', function() {
            trackLoader.loadFromDrop.returns(Promise.resolve([]));

            return loadTracksFromDrop([])(this.dispatch).then(() => {
                expect(this.dispatch).to.have.callCount(0);
            });
        });

        it('should add tracks to the player when they added from drop', function() {
            const files = [ 'file1', 'file2' ];
            const tracks = [ 'track1', 'track2' ];

            trackLoader.loadFromDrop.returns(Promise.resolve(tracks));

            return loadTracksFromDrop(files)(this.dispatch).then(() => {
                expect(player.addTracks).to.have.callCount(1);
                expect(player.addTracks).to.be.calledWith(tracks);
            });
        });

        it('should create LOAD_TRACKS_SUCCESS action when tracks is added from drop', function() {
            const files = [ 'file1', 'file2' ];
            const tracks = [ 'track1', 'track2' ];

            trackLoader.loadFromDrop.returns(Promise.resolve(tracks));

            return loadTracksFromDrop(files)(this.dispatch).then(() => {
                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.LOAD_TRACKS_SUCCESS,
                    tracks
                });
            });
        });

    });
});

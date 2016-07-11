import {
    loadTracks,
    loadTracksFromDrop,
    clearTracks,
    removeTracks,
    nextTrack,
    prevTrack,
    pauseTrack,
    playTrack,
    selectTrack,
    selectNextTrack,
    selectPrevTrack,
    selectRangeTracks,
    reportPlayerError,
    setRootOfSelection,
    unsetRootOfSelection,
    moveDownSelection,
    moveUpSelection,
    updateTrackPosition
} from 'actions';
import types from 'constants/ActionTypes';
import trackLoader from 'lib/trackLoader';
import trackCleaner from 'lib/trackCleaner';
import notifications from 'lib/notifications';
import playerErrorReporter from 'lib/playerErrorReporter';
import player from 'lib/player';

describe('actions', () => {
    describe('tracks', () => {
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

            it('should dispatch LOAD_TRACKS_SUCCESS action when tracks is added into the dialog', function() {
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

            it('should add tracks to the player when they added from drop', function() {
                const files = [ 'file1', 'file2' ];
                const tracks = [ 'track1', 'track2' ];

                trackLoader.loadFromDrop.returns(Promise.resolve(tracks));

                return loadTracksFromDrop(files)(this.dispatch).then(() => {
                    expect(player.addTracks).to.have.callCount(1);
                    expect(player.addTracks).to.be.calledWith(tracks);
                });
            });

            it('should dispatch LOAD_TRACKS_SUCCESS action when tracks is added from drop', function() {
                const files = [ 'file1', 'file2' ];
                const tracks = [ 'track1', 'track2' ];

                trackLoader.loadFromDrop.returns(Promise.resolve(tracks));

                return loadTracksFromDrop(files)(this.dispatch).then(() => {
                    expect(this.dispatch).to.be.calledWith({
                        type: types.LOAD_TRACKS_SUCCESS,
                        tracks
                    });
                });
            });
        });

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

            it('should dispatch CLEAR_TRACKS action', function() {
                clearTracks()(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({ type: types.CLEAR_TRACKS });
            });
        });

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

        describe('nextTrack', () => {
            beforeEach(function() {
                this.dispatch = this.sinon.spy();
                this.sinon.stub(player, 'next');
                this.sinon.stub(player, 'getCurrentTrack').returns({ id: 10 });
                this.sinon.stub(player, 'getCurrentTrackId').returns(10);
                this.sinon.stub(notifications, 'nextTrack');
            });

            it('should switch to the next track', function() {
                nextTrack()(this.dispatch);

                expect(player.next).to.have.callCount(1);
            });

            it('should notify about the next track', function() {
                nextTrack()(this.dispatch);

                expect(notifications.nextTrack).to.have.callCount(1);
            });

            it('should dispatch PLAY_TRACK action', function() {
                nextTrack()(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.PLAY_TRACK,
                    id: 10
                });
            });
        });

        describe('prevTrack', () => {
            beforeEach(function() {
                this.dispatch = this.sinon.spy();
                this.sinon.stub(player, 'prev');
                this.sinon.stub(player, 'getCurrentTrackId').returns(10);
            });

            it('should switch to the prev track', function() {
                prevTrack()(this.dispatch);

                expect(player.prev).to.have.callCount(1);
            });

            it('should dispatch PLAY_TRACK action', function() {
                prevTrack()(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.PLAY_TRACK,
                    id: 10
                });
            });
        });

        describe('pauseTrack', () => {
            beforeEach(function() {
                this.dispatch = this.sinon.spy();
                this.sinon.stub(player, 'pause');
                this.sinon.stub(player, 'getCurrentTrackId').returns(10);
            });

            it('player must pause', function() {
                pauseTrack()(this.dispatch);

                expect(player.pause).to.have.callCount(1);
            });

            it('should dispatch PAUSE_TRACK action', function() {
                pauseTrack(10)(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.PAUSE_TRACK,
                    id: 10
                });
            });
        });

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

            it('should dispatch PLAY_TRACK action with id from player', function() {
                player.getCurrentTrackId.returns(5);

                playTrack()(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.PLAY_TRACK,
                    id: 5
                });
            });
        });

        describe('selectTrack', () => {
            it('should create SELECT_TRACK action', function() {
                expect(selectTrack(111, {
                    resetSelected: true
                })).to.be.eql({
                    type: types.SELECT_TRACK,
                    id: 111,
                    options: {
                        resetSelected: true
                    }
                });
            });
        });

        describe('selectNextTrack', () => {
            it('should create SELECT_NEXT_TRACK action', function() {
                expect(selectNextTrack()).to.be.eql({ type: types.SELECT_NEXT_TRACK });
            });
        });

        describe('selectPrevTrack', () => {
            it('should create SELECT_PREV_TRACK action', function() {
                expect(selectPrevTrack()).to.be.eql({ type: types.SELECT_PREV_TRACK });
            });
        });

        describe('selectRangeTracks', () => {
            it('should create SELECT_RANGE_TRACKS action', function() {
                expect(selectRangeTracks(111)).to.be.eql({
                    type: types.SELECT_RANGE_TRACKS,
                    id: 111
                });
            });
        });

        describe('setRootOfSelection', () => {
            it('should create SET_ROOT_OF_SELECTION action', () => {
                expect(setRootOfSelection()).to.be.eql({ type: types.SET_ROOT_OF_SELECTION });
            });
        });

        describe('unsetRootOfSelection', () => {
            it('should create UNSET_ROOT_OF_SELECTION action', () => {
                expect(unsetRootOfSelection()).to.be.eql({ type: types.UNSET_ROOT_OF_SELECTION });
            });
        });

        describe('moveDownSelection', () => {
            it('should create MOVE_DOWN_SELECTION action', () => {
                expect(moveDownSelection()).to.be.eql({ type: types.MOVE_DOWN_SELECTION });
            });
        });

        describe('moveUpSelection', () => {
            it('should create MOVE_UP_SELECTION action', () => {
                expect(moveUpSelection()).to.be.eql({ type: types.MOVE_UP_SELECTION });
            });
        });

        describe('updateTrackPosition', () => {
            beforeEach(function() {
                this.dispatch = this.sinon.spy();
                this.sinon.stub(player, 'updateTrackPosition');
            });

            it('should update position of track in player', function() {
                updateTrackPosition('1', '2')(this.dispatch);

                expect(player.updateTrackPosition).to.have.callCount(1);
                expect(player.updateTrackPosition).to.be.calledWith('1', '2');
            });

            it('should dispatch UPDATE_TRACK_POSITION action', function() {
                updateTrackPosition('1', '2')(this.dispatch);

                expect(this.dispatch).to.have.callCount(1);
                expect(this.dispatch).to.be.calledWith({
                    type: types.UPDATE_TRACK_POSITION,
                    trackId: '1',
                    targetId: '2'
                });
            });
        });

        describe('reportPlayerError', () => {
            beforeEach(function() {
                this.dispatch = this.sinon.spy();
                this.sinon.stub(playerErrorReporter, 'report');
                playerErrorReporter.report.yields();
            });

            it('should report error', function() {
                reportPlayerError('src', 10)(this.dispatch);

                expect(playerErrorReporter.report).to.have.callCount(1);
                expect(playerErrorReporter.report).to.be.calledWith('src');
            });
        });
    });
});

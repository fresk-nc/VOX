import player from 'lib/player';

describe('lib', () => {
    describe('player', () => {
        describe('addTracks', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_shuffleTracks');
                this.sinon.stub(player, '_list', []);
                this.sinon.stub(player, '_noShuffleList', []);
                this.sinon.stub(player, '_currentTrack', null);

                this.tracks = [
                    {
                        id: 1,
                        src: 'src',
                        title: 'title',
                        album: 'album',
                        artist: 'artist',
                        duration: 100,
                        isPlay: false,
                        isCurrent: false
                    },
                    {
                        id: 2,
                        src: 'src',
                        title: 'title',
                        album: 'album',
                        artist: 'artist',
                        duration: 200,
                        isPlay: false,
                        isCurrent: false
                    }
                ];

                this.processedTracks = [
                    {
                        id: 1,
                        src: 'src',
                        title: 'title',
                        album: 'album',
                        artist: 'artist'
                    },
                    {
                        id: 2,
                        src: 'src',
                        title: 'title',
                        album: 'album',
                        artist: 'artist'
                    }
                ];
            });

            it('should add tracks to shuffle list and no shuffle list', function() {
                player.addTracks(this.tracks);

                expect(player._list).to.be.eql(this.processedTracks);
                expect(player._noShuffleList).to.be.eql(this.processedTracks);
            });

            it('should keep current track if it there is', function() {
                this.tracks[0].isCurrent = true;
                player.addTracks(this.tracks);

                expect(player._currentTrack).to.be.eql(this.processedTracks[0]);
            });

            it('should not shuffle tracks', function() {
                this.sinon.stub(player, '_shuffle', false);

                player.addTracks(this.tracks);

                expect(player._shuffleTracks).to.have.callCount(0);
            });

            it('should shuffle tracks when shuffle mode', function() {
                this.sinon.stub(player, '_shuffle', true);

                player.addTracks(this.tracks);

                expect(player._shuffleTracks).to.have.callCount(1);
            });
        });

        describe('removeTrack', () => {
            beforeEach(function() {
                this.sinon.stub(player, 'pause');
                this.sinon.stub(player, '_list', []);
                this.sinon.stub(player, '_noShuffleList', []);
                this.sinon.stub(player, '_currentTrack', null);
            });

            it('should remove track from shuffle list and no shuffle list', function() {
                this.sinon.stub(player, '_list', [
                    { id: 3 },
                    { id: 1 },
                    { id: 2 }
                ]);
                this.sinon.stub(player, '_noShuffleList', [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 }
                ]);

                player.removeTrack(1);

                expect(player._list).to.be.eql([
                    { id: 3 },
                    { id: 2 }
                ]);
                expect(player._noShuffleList).to.be.eql([
                    { id: 2 },
                    { id: 3 }
                ]);
            });

            it('should clear a current track when it is removed', function() {
                this.sinon.stub(player, '_currentTrack', { id: 1 });

                expect(player._currentTrack).to.be.eql({ id: 1 });

                player.removeTrack(1);

                expect(player._currentTrack).to.be.equal(null);
            });

            it('player must pause when current track is removed', function() {
                this.sinon.stub(player, '_currentTrack', { id: 1 });

                player.removeTrack(1);

                expect(player.pause).to.have.callCount(1);
            });
        });

        describe('play', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_updateCurrentTrack');
                this.sinon.stub(player, '_updateSrc');
                this.sinon.stub(player, '_hasSrc');
                this.sinon.stub(player, '_play');
                this.sinon.stub(player, '_currentTrack', null);
                this.sinon.stub(player, '_list', [
                    { id: 1 },
                    { id: 2 }
                ]);
            });

            it('should play a track with a predetermined id', function() {
                player.play(2);

                expect(player._updateCurrentTrack).to.have.callCount(1);
                expect(player._updateCurrentTrack).to.be.calledWith({ id: 2 });

                expect(player._updateSrc).to.have.callCount(1);
                expect(player._updateSrc).to.be.calledAfter(player._updateCurrentTrack);

                expect(player._play).to.have.callCount(1);
                expect(player._play).to.be.calledAfter(player._updateSrc);
            });

            it('should play a first track when there is no current track and id is not passed', function() {
                player.play();

                expect(player._updateCurrentTrack).to.have.callCount(1);
                expect(player._updateCurrentTrack).to.be.calledWith({ id: 1 });

                expect(player._updateSrc).to.have.callCount(1);
                expect(player._updateSrc).to.be.calledAfter(player._updateCurrentTrack);

                expect(player._play).to.have.callCount(1);
                expect(player._play).to.be.calledAfter(player._updateSrc);
            });

            it('should play a current track when id is not passed', function() {
                this.sinon.stub(player, '_currentTrack', { id: 1 });
                player._hasSrc.returns(true);

                player.play();

                expect(player._updateSrc).to.have.callCount(0);
                expect(player._play).to.have.callCount(1);
            });

            it('should update src before play when a audio has not src', function() {
                this.sinon.stub(player, '_currentTrack', { id: 1 });
                player._hasSrc.returns(false);

                player.play();

                expect(player._updateSrc).to.have.callCount(1);

                expect(player._play).to.have.callCount(1);
                expect(player._play).to.be.calledAfter(player._updateSrc);
            });
        });

        describe('next', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_getNextTrackIndex');
                this.sinon.stub(player, 'play');
                this.sinon.stub(player, 'pause');
                this.sinon.stub(player, '_list', [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 }
                ]);
            });

            it('should play a next track, when it there is', function() {
                player._getNextTrackIndex.returns(1);

                player.next();

                expect(player.play).to.have.callCount(1);
                expect(player.play).to.be.calledWith(2);
            });

            it('should clear a current track when there is no a next track', function() {
                this.sinon.stub(player, '_currentTrack', { id: 3 });
                player._getNextTrackIndex.returns(-1);

                expect(player._currentTrack).to.be.eql({ id: 3 });

                player.next();

                expect(player._currentTrack).to.be.equal(null);
            });

            it('should not play a next track, when it there is no', function() {
                player._getNextTrackIndex.returns(-1);

                player.next();

                expect(player.play).to.have.callCount(0);
                expect(player.pause).to.have.callCount(1);
            });
        });

        describe('prev', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_getPrevTrackIndex');
                this.sinon.stub(player, 'play');
                this.sinon.stub(player, 'pause');
                this.sinon.stub(player, '_list', [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 }
                ]);
            });

            it('should play a prev track, when it there is', function() {
                player._getPrevTrackIndex.returns(1);

                player.prev();

                expect(player.play).to.have.callCount(1);
                expect(player.play).to.be.calledWith(2);
            });

            it('should clear a current track when there is no a prev track', function() {
                this.sinon.stub(player, '_currentTrack', { id: 3 });
                player._getPrevTrackIndex.returns(-1);

                expect(player._currentTrack).to.be.eql({ id: 3 });

                player.prev();

                expect(player._currentTrack).to.be.equal(null);
            });

            it('should not play a prev track, when it there is no', function() {
                player._getPrevTrackIndex.returns(-1);

                player.prev();

                expect(player.play).to.have.callCount(0);
                expect(player.pause).to.have.callCount(1);
            });
        });

        describe('getCurrentTrack', () => {
            it('should return a current track', function() {
                this.sinon.stub(player, '_currentTrack', { id: 3 });

                expect(player.getCurrentTrack()).to.be.eql({ id: 3 });
            });
        });

        describe('getCurrentTrackId', () => {
            it('should return id of a current track', function() {
                this.sinon.stub(player, '_currentTrack', { id: 3 });

                expect(player.getCurrentTrackId()).to.be.equal(3);
            });

            it('should return null when there is no a current track', function() {
                this.sinon.stub(player, '_currentTrack', null);

                expect(player.getCurrentTrackId()).to.be.equal(null);
            });
        });

        describe('on', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_events', []);
            });

            it('should add callback for an non-existing event', function() {
                expect(player._events['some-event']).to.be.equal(undefined);

                player.on('some-event', () => {});

                expect(player._events['some-event']).to.have.length(1);
            });

            it('should add callback for an existing event', function() {
                player._events['some-event'] = [ () => {} ];

                expect(player._events['some-event']).to.have.length(1);

                player.on('some-event', () => {});

                expect(player._events['some-event']).to.have.length(2);
            });
        });

        describe('trigger', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_events', []);
            });

            it('should call callbacks with right args', function() {
                const cb1 = this.sinon.spy();
                const cb2 = this.sinon.spy();
                player._events.event1 = [ cb1, cb2 ];

                player.trigger('event1', 'arg1', 'arg2');

                expect(cb1).to.have.callCount(1);
                expect(cb1).to.be.calledWith('arg1', 'arg2');
                expect(cb2).to.have.callCount(1);
                expect(cb2).to.be.calledWith('arg1', 'arg2');
            });
        });

        describe('clearTrackList', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_list', [
                    { id: 1 }
                ]);
                this.sinon.stub(player, '_noShuffleList', [
                    { id: 1 }
                ]);
                this.sinon.stub(player, '_currentTrack', { id: 1 });
            });

            it('should clear the shuffle list', function() {
                expect(player._list).to.have.length(1);

                player.clearTrackList();

                expect(player._list).to.have.length(0);
            });

            it('should clear the no shuffle list', function() {
                expect(player._noShuffleList).to.have.length(1);

                player.clearTrackList();

                expect(player._noShuffleList).to.have.length(0);
            });

            it('should clear the current track', function() {
                expect(player._currentTrack).to.be.eql({ id: 1 });

                player.clearTrackList();

                expect(player._currentTrack).to.be.equal(null);
            });
        });

        describe('shuffleOn', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_shuffleTracks');
                this.sinon.stub(player, '_shuffle', false);
            });

            it('should switch on the shuffle mode', function() {
                expect(player._shuffle).to.be.equal(false);

                player.shuffleOn();

                expect(player._shuffle).to.be.equal(true);
            });

            it('should shuffle the tack list', function() {
                player.shuffleOn();

                expect(player._shuffleTracks).to.have.callCount(1);
            });
        });

        describe('shuffleOff', () => {
            beforeEach(function() {
                this.shuffleList = [
                    { id: 1 },
                    { id: 3 },
                    { id: 2 }
                ];
                this.noShuffleList = [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 }
                ];

                this.sinon.stub(player, '_shuffle', true);
                this.sinon.stub(player, '_list', this.shuffleList);
                this.sinon.stub(player, '_noShuffleList', this.noShuffleList);
            });

            it('should switch off the shuffle mode', function() {
                expect(player._shuffle).to.be.equal(true);

                player.shuffleOff();

                expect(player._shuffle).to.be.equal(false);
            });

            it('should restore the no shuffle list', function() {
                expect(player._list).to.be.eql(this.shuffleList);

                player.shuffleOff();

                expect(player._list).to.be.eql(this.noShuffleList);
            });
        });

        describe('changeLoopMode', () => {
            beforeEach(function() {
                this.sinon.stub(player, '_loopMode', 'all');
            });

            it('should change the loop mode', function() {
                expect(player._loopMode).to.be.equal('all');

                player.changeLoopMode('one');

                expect(player._loopMode).to.be.equal('one');
            });
        });

        describe('_getNextTrackIndex', () => {
            it('should return index of a first track when there is no a current track', function() {
                this.sinon.stub(player, '_list', [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 }
                ]);
                this.sinon.stub(player, '_currentTrack', null);

                expect(player._getNextTrackIndex()).to.be.equal(0);
            });

            it('should return index of a current track when loop mode is `one`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    { id: 1 },
                    currentTrack,
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'one');

                expect(player._getNextTrackIndex()).to.be.equal(1);
            });

            it('should return 0 when a current track is last and loop mode is `all`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    { id: 1 },
                    { id: 3 },
                    currentTrack
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'all');

                expect(player._getNextTrackIndex()).to.be.equal(0);
            });

            it('should return index of a next track when a current track is no last and loop mode is `all`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    currentTrack,
                    { id: 1 },
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'all');

                expect(player._getNextTrackIndex()).to.be.equal(1);
            });

            it('should return -1 when a current track is last and loop mode is `off`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    { id: 1 },
                    { id: 3 },
                    currentTrack
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'off');

                expect(player._getNextTrackIndex()).to.be.equal(-1);
            });

            it('should return index of a next track when a current track is no last and loop mode is `off`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    currentTrack,
                    { id: 1 },
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'off');

                expect(player._getNextTrackIndex()).to.be.equal(1);
            });
        });

        describe('_getPrevTrackIndex', () => {
            it('should return index of a last track when there is no a current track', function() {
                const tracks = [
                    { id: 1 },
                    { id: 2 },
                    { id: 3 }
                ];
                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', null);

                expect(player._getPrevTrackIndex()).to.be.equal(tracks.length - 1);
            });

            it('should return index of a current track when loop mode is `one`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    { id: 1 },
                    currentTrack,
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'one');

                expect(player._getPrevTrackIndex()).to.be.equal(1);
            });

            it('should return index of a last track when a current track is first and loop mode is `all`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    currentTrack,
                    { id: 1 },
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'all');

                expect(player._getPrevTrackIndex()).to.be.equal(tracks.length - 1);
            });

            it('should return index of a prev track when a current track is no first and loop mode is `all`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    { id: 1 },
                    currentTrack,
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'all');

                expect(player._getPrevTrackIndex()).to.be.equal(0);
            });

            it('should return -1 when a current track is first and loop mode is `off`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    currentTrack,
                    { id: 1 },
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'off');

                expect(player._getPrevTrackIndex()).to.be.equal(-1);
            });

            it('should return index of a prev track when a current track is no first and loop mode is `off`', function() {
                const currentTrack = { id: 2 };
                const tracks = [
                    { id: 1 },
                    currentTrack,
                    { id: 3 }
                ];

                this.sinon.stub(player, '_list', tracks);
                this.sinon.stub(player, '_currentTrack', currentTrack);
                this.sinon.stub(player, '_loopMode', 'off');

                expect(player._getPrevTrackIndex()).to.be.equal(0);
            });
        });
    });
});

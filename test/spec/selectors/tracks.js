import { List } from 'immutable';
import Track from 'records/Track';
import Search from 'records/Search';
import {
    getTotalDuration,
    getCurrentTrack,
    getCount,
    getSelectedTracks,
    searchTracks
} from 'selectors/tracks';

describe('selectors', () => {
    describe('tracks', () => {
        describe('getTotalDuration', () => {
            it('should return 0 if there are no tracks', () => {
                const state = {
                    tracks: List()
                };

                expect(getTotalDuration(state)).to.be.equal(0);
            });

            it('should return duration total', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', duration: 100 }),
                        new Track({ id: '2', duration: 220 })
                    ])
                };

                expect(getTotalDuration(state)).to.be.equal(320);
            });
        });

        describe('getCurrentTrack', () => {
            it('should return current track', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', isCurrent: true }),
                        new Track({ id: '2', isCurrent: false })
                    ])
                };

                expect(getCurrentTrack(state)).to.be.equal(state.tracks.get(0));
            });

            it('should return undefined if there is no current track', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', isCurrent: false }),
                        new Track({ id: '2', isCurrent: false })
                    ])
                };

                expect(getCurrentTrack(state)).to.be.equal(undefined);
            });
        });

        describe('getSelectedTracks', () => {
            it('should return selected tracks', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true })
                    ])
                };

                expect(getSelectedTracks(state))
                    .to.be.equal(
                        List([
                            new Track({ id: '2', isSelected: true }),
                            new Track({ id: '3', isSelected: true })
                        ])
                    );
            });

            it('should return empty list if there are no selected tracks', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false })
                    ])
                };

                expect(getSelectedTracks(state)).to.be.equal(List());
            });
        });

        describe('getCount', () => {
            it('should return the number of tracks', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1' }),
                        new Track({ id: '2' }),
                        new Track({ id: '3' })
                    ])
                };

                expect(getCount(state)).to.be.equal(3);
            });
        });

        describe('searchTracks', () => {
            it('should return the empty List when not find the tracks', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', title: 'a title', artist: 'foo', album: 'foo' }),
                        new Track({ id: '2', title: 'b', artist: 'foo', album: 'foo' }),
                        new Track({ id: '3', title: 'bar', artist: 'foo', album: 'foo' })
                    ]),
                    search: new Search()
                };

                expect(searchTracks(state)).to.be.equal(List());
            });

            it('should search by track title', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', title: 'a title', artist: 'foo', album: 'foo' }),
                        new Track({ id: '2', title: 'b', artist: 'foo', album: 'foo' }),
                        new Track({ id: '3', title: 'bar', artist: 'foo', album: 'foo' })
                    ]),
                    search: new Search({ text: 'a' })
                };

                expect(searchTracks(state)).to.be.equal(
                    List([
                        new Track({ id: '1', title: 'a title', artist: 'foo', album: 'foo' }),
                        new Track({ id: '3', title: 'bar', artist: 'foo', album: 'foo' })
                    ])
                );
            });

            it('should search by track artist', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', title: 'foo', artist: 'a artist', album: 'foo' }),
                        new Track({ id: '2', title: 'foo', artist: 'b', album: 'foo' }),
                        new Track({ id: '3', title: 'foo', artist: 'bar', album: 'foo' })
                    ]),
                    search: new Search({ text: 'a' })
                };

                expect(searchTracks(state)).to.be.equal(
                    List([
                        new Track({ id: '1', title: 'foo', artist: 'a artist', album: 'foo' }),
                        new Track({ id: '3', title: 'foo', artist: 'bar', album: 'foo' })
                    ])
                );
            });

            it('should search by track album', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', title: 'foo', artist: 'foo', album: 'a album' }),
                        new Track({ id: '2', title: 'foo', artist: 'foo', album: 'b' }),
                        new Track({ id: '3', title: 'foo', artist: 'foo', album: 'bar' })
                    ]),
                    search: new Search({ text: 'a' })
                };

                expect(searchTracks(state)).to.be.equal(
                    List([
                        new Track({ id: '1', title: 'foo', artist: 'foo', album: 'a album' }),
                        new Track({ id: '3', title: 'foo', artist: 'foo', album: 'bar' })
                    ])
                );
            });
        });
    });
});

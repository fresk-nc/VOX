import { getTotalDuration, getCurrentTrack, getCount } from 'selectors/tracks';
import { List } from 'immutable';
import Track from 'records/Track';

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
    });
});

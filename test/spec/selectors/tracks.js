import { List } from 'immutable';
import Track from 'records/Track';
import {
    getTotalDuration,
    getCurrentTrack,
    getCount,
    getSelectedTrack
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

        describe('getSelectedTrack', () => {
            it('should return selected track', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true })
                    ])
                };

                expect(getSelectedTrack(state)).to.be.equal(state.tracks.get(1));
            });

            it('should return undefined if there is no selected track', () => {
                const state = {
                    tracks: List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false })
                    ])
                };

                expect(getSelectedTrack(state)).to.be.equal(undefined);
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

import { getTotalDuration, getCurrentTrack, getCount } from 'selectors/tracks';
import { fromJS, List } from 'immutable';

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
                    tracks: fromJS([
                        { id: '1', duration: 100 },
                        { id: '2', duration: 220 }
                    ])
                };

                expect(getTotalDuration(state)).to.be.equal(320);
            });
        });

        describe('getCurrentTrack', () => {
            it('should return current track', () => {
                const state = {
                    tracks: fromJS([
                        { id: '1', isCurrent: true },
                        { id: '2', isCurrent: false }
                    ])
                };

                expect(getCurrentTrack(state)).to.be.equal(state.tracks.get(0));
            });

            it('should return undefined if there is no current track', () => {
                const state = {
                    tracks: fromJS([
                        { id: '1', isCurrent: false },
                        { id: '2', isCurrent: false }
                    ])
                };

                expect(getCurrentTrack(state)).to.be.equal(undefined);
            });
        });

        describe('getCount', () => {
            it('should return the number of tracks', () => {
                const state = {
                    tracks: fromJS([
                        { id: '1' },
                        { id: '2' },
                        { id: '3' }
                    ])
                };

                expect(getCount(state)).to.be.equal(3);
            });
        });
    });
});

import { List } from 'immutable';
import tracks from 'reducers/tracks';
import types from 'constants/ActionTypes';
import Track from 'records/Track';

describe('reducers', () => {
    describe('tracks', () => {
        it('should handle initial state', () => {
            expect(tracks(undefined, {})).to.be.equal(List());
        });

        it('should handle LOAD_TRACKS_SUCCESS', () => {
            expect(
                tracks(
                    List(),
                    {
                        type: types.LOAD_TRACKS_SUCCESS,
                        tracks: [
                            { id: '1' },
                            { id: '2' }
                        ]
                    }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1' }),
                    new Track({ id: '2' })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1' }),
                        new Track({ id: '2' })
                    ]),
                    {
                        type: types.LOAD_TRACKS_SUCCESS,
                        tracks: [
                            { id: '3' },
                            { id: '4' }
                        ]
                    }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1' }),
                    new Track({ id: '2' }),
                    new Track({ id: '3' }),
                    new Track({ id: '4' })
                ])
            );
        });

        it('should handle CLEAR_TRACKS', () => {
            expect(
                tracks(
                    List([
                        new Track({ id: '1' }),
                        new Track({ id: '2' })
                    ]),
                    { type: types.CLEAR_TRACKS }
                )
            ).to.be.equal(List());
        });

        it('should handle REMOVE_TRACK', () => {
            const state = List([
                new Track({ id: '1' }),
                new Track({ id: '2' }),
                new Track({ id: '3' })
            ]);

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '1' })).to.be.equal(
                List([
                    new Track({ id: '2' }),
                    new Track({ id: '3' })
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '2' })).to.be.equal(
                List([
                    new Track({ id: '1' }),
                    new Track({ id: '3' })
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '3' })).to.be.equal(
                List([
                    new Track({ id: '1' }),
                    new Track({ id: '2' })
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '4' })).to.be.equal(state);
        });

        it('should handle PLAY_TRACK', () => {
            expect(
                tracks(
                    List([
                        new Track({ id: '1', isPlay: false, isCurrent: false }),
                        new Track({ id: '2', isPlay: false, isCurrent: false })
                    ]),
                    { type: types.PLAY_TRACK, id: '1' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isPlay: true, isCurrent: true }),
                    new Track({ id: '2', isPlay: false, isCurrent: false })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isPlay: true, isCurrent: true }),
                        new Track({ id: '2', isPlay: false, isCurrent: false })
                    ]),
                    { type: types.PLAY_TRACK, id: '2' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isPlay: false, isCurrent: false }),
                    new Track({ id: '2', isPlay: true, isCurrent: true })
                ])
            );
        });

        it('should handle PAUSE_TRACK', () => {
            expect(
                tracks(
                    List([
                        new Track({ id: '1', isPlay: true, isCurrent: true }),
                        new Track({ id: '2', isPlay: false, isCurrent: false })
                    ]),
                    { type: types.PAUSE_TRACK, id: '1' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isPlay: false, isCurrent: true }),
                    new Track({ id: '2', isPlay: false, isCurrent: false })
                ])
            );
        });

        it('should handle SELECT_TRACK', () => {
            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false })
                    ]),
                    { type: types.SELECT_TRACK, id: '1' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: false })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true })
                    ]),
                    { type: types.SELECT_TRACK, id: '1' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: false })
                ])
            );
        });

        it('should handle SELECT_NEXT_TRACK', () => {
            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false })
                    ]),
                    { type: types.SELECT_NEXT_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: false })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: true }),
                        new Track({ id: '2', isSelected: false })
                    ]),
                    { type: types.SELECT_NEXT_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: false }),
                    new Track({ id: '2', isSelected: true })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true })
                    ]),
                    { type: types.SELECT_NEXT_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: false }),
                    new Track({ id: '2', isSelected: true })
                ])
            );
        });

        it('should handle SELECT_PREV_TRACK', () => {
            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false })
                    ]),
                    { type: types.SELECT_PREV_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: false }),
                    new Track({ id: '2', isSelected: true })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true })
                    ]),
                    { type: types.SELECT_PREV_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: false })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: true }),
                        new Track({ id: '2', isSelected: false })
                    ]),
                    { type: types.SELECT_PREV_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: false })
                ])
            );
        });
    });
});

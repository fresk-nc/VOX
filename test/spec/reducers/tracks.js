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

        it('should handle REMOVE_TRACKS', () => {
            const state = List([
                new Track({ id: '1' }),
                new Track({ id: '2' }),
                new Track({ id: '3' })
            ]);

            expect(tracks(state, { type: types.REMOVE_TRACKS, ids: [ '1' ] })).to.be.equal(
                List([
                    new Track({ id: '2' }),
                    new Track({ id: '3' })
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACKS, ids: [ '2', '3' ] })).to.be.equal(
                List([
                    new Track({ id: '1' })
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACKS, ids: [ '4' ] })).to.be.equal(state);
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
                    {
                        type: types.SELECT_TRACK,
                        id: '1',
                        options: {
                            resetSelected: true
                        }
                    }
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
                    {
                        type: types.SELECT_TRACK,
                        id: '1',
                        options: {
                            resetSelected: true
                        }
                    }
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
                        new Track({ id: '2', isSelected: true })
                    ]),
                    {
                        type: types.SELECT_TRACK,
                        id: '1',
                        options: {
                            resetSelected: true
                        }
                    }
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
                    {
                        type: types.SELECT_TRACK,
                        id: '2',
                        options: {
                            resetSelected: false
                        }
                    }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: true })
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

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: true }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: false })
                    ]),
                    { type: types.SELECT_NEXT_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: false }),
                    new Track({ id: '2', isSelected: false }),
                    new Track({ id: '3', isSelected: true })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: true }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true })
                    ]),
                    { type: types.SELECT_NEXT_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: false }),
                    new Track({ id: '2', isSelected: false }),
                    new Track({ id: '3', isSelected: true })
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

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true })
                    ]),
                    { type: types.SELECT_PREV_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: false }),
                    new Track({ id: '3', isSelected: false })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: true }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true })
                    ]),
                    { type: types.SELECT_PREV_TRACK }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: false }),
                    new Track({ id: '3', isSelected: false })
                ])
            );
        });

        it('should handle SELECT_RANGE_TRACKS', () => {
            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false }),
                        new Track({ id: '3', isSelected: false })
                    ]),
                    { type: types.SELECT_RANGE_TRACKS, id: '2' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: true }),
                    new Track({ id: '3', isSelected: false })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: false })
                    ]),
                    { type: types.SELECT_RANGE_TRACKS, id: '3' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: false }),
                    new Track({ id: '2', isSelected: true }),
                    new Track({ id: '3', isSelected: true })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false }),
                        new Track({ id: '3', isSelected: true })
                    ]),
                    { type: types.SELECT_RANGE_TRACKS, id: '1' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: true }),
                    new Track({ id: '2', isSelected: true }),
                    new Track({ id: '3', isSelected: true })
                ])
            );

            expect(
                tracks(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: false }),
                        new Track({ id: '3', isSelected: true })
                    ]),
                    { type: types.SELECT_RANGE_TRACKS, id: '3' }
                )
            ).to.be.equal(
                List([
                    new Track({ id: '1', isSelected: false }),
                    new Track({ id: '2', isSelected: false }),
                    new Track({ id: '3', isSelected: true })
                ])
            );
        });

        describe('SET_ROOT_OF_SELECTION', () => {
            it('should not handle empty list', () => {
                expect(tracks(List(), { type: types.SET_ROOT_OF_SELECTION }))
                    .to.be.equal(List());
            });

            it('should set root of selection on first track when there are no selected tracks', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1', isSelected: false }),
                            new Track({ id: '2', isSelected: false }),
                            new Track({ id: '3', isSelected: false })
                        ]),
                        { type: types.SET_ROOT_OF_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1', isSelected: false, rootOfSelection: true }),
                        new Track({ id: '2', isSelected: false }),
                        new Track({ id: '3', isSelected: false })
                    ])
                );
            });

            it('should set root of selection on first selected track', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1', isSelected: false }),
                            new Track({ id: '2', isSelected: true }),
                            new Track({ id: '3', isSelected: true })
                        ]),
                        { type: types.SET_ROOT_OF_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '3', isSelected: true })
                    ])
                );
            });
        });

        describe('UNSET_ROOT_OF_SELECTION', () => {
            it('should unset root of selection', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1' }),
                            new Track({ id: '2', rootOfSelection: true }),
                            new Track({ id: '3' })
                        ]),
                        { type: types.UNSET_ROOT_OF_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1' }),
                        new Track({ id: '2' }),
                        new Track({ id: '3' })
                    ])
                );
            });
        });

        describe('MOVE_DOWN_SELECTION', () => {
            it('should not handle when list is empty', () => {
                expect(tracks(List([]), { type: types.MOVE_DOWN_SELECTION }))
                    .to.be.equal(List([]));
            });

            it('should select the root track when it is not selected', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1', rootOfSelection: true }),
                            new Track({ id: '2' }),
                            new Track({ id: '3' })
                        ]),
                        { type: types.MOVE_DOWN_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '2' }),
                        new Track({ id: '3' })
                    ])
                );
            });

            it('should deselect the first selected track before the root track', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1', isSelected: true }),
                            new Track({ id: '2', isSelected: true }),
                            new Track({ id: '3', isSelected: true, rootOfSelection: true }),
                            new Track({ id: '4' })
                        ]),
                        { type: types.MOVE_DOWN_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1' }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '4' })
                    ])
                );
            });

            it('should select the first not selected track after the root track', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1' }),
                            new Track({ id: '2', isSelected: true, rootOfSelection: true }),
                            new Track({ id: '3', isSelected: true }),
                            new Track({ id: '4' })
                        ]),
                        { type: types.MOVE_DOWN_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1' }),
                        new Track({ id: '2', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '3', isSelected: true }),
                        new Track({ id: '4', isSelected: true })
                    ])
                );
            });

            it('should return current state when there are no selected tracks before root and not selected after', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1' }),
                            new Track({ id: '2', isSelected: true, rootOfSelection: true }),
                            new Track({ id: '3', isSelected: true }),
                            new Track({ id: '4', isSelected: true })
                        ]),
                        { type: types.MOVE_DOWN_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1' }),
                        new Track({ id: '2', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '3', isSelected: true }),
                        new Track({ id: '4', isSelected: true })
                    ])
                );
            });
        });

        describe('MOVE_UP_SELECTION', () => {
            it('should not handle when list is empty', () => {
                expect(tracks(List([]), { type: types.MOVE_UP_SELECTION }))
                    .to.be.equal(List([]));
            });

            it('should select all tracks when the root track is not selected', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1', rootOfSelection: true }),
                            new Track({ id: '2' }),
                            new Track({ id: '3' })
                        ]),
                        { type: types.MOVE_UP_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true })
                    ])
                );
            });

            it('should deselect the last selected track after the root track', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1' }),
                            new Track({ id: '2', isSelected: true, rootOfSelection: true }),
                            new Track({ id: '3', isSelected: true }),
                            new Track({ id: '4', isSelected: true })
                        ]),
                        { type: types.MOVE_UP_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1', isSelected: false }),
                        new Track({ id: '2', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '3', isSelected: true }),
                        new Track({ id: '4', isSelected: false })
                    ])
                );
            });

            it('should select the first not selected track before the root track', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1', isSelected: false }),
                            new Track({ id: '2', isSelected: true }),
                            new Track({ id: '3', isSelected: true, rootOfSelection: true }),
                            new Track({ id: '4', isSelected: false })
                        ]),
                        { type: types.MOVE_UP_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1', isSelected: true }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '4', isSelected: false })
                    ])
                );
            });

            it('should return current state when there are no selected tracks after root and not selected before', () => {
                expect(
                    tracks(
                        List([
                            new Track({ id: '1', isSelected: true }),
                            new Track({ id: '2', isSelected: true }),
                            new Track({ id: '3', isSelected: true, rootOfSelection: true }),
                            new Track({ id: '4', isSelected: false })
                        ]),
                        { type: types.MOVE_UP_SELECTION }
                    )
                ).to.be.equal(
                    List([
                        new Track({ id: '1', isSelected: true }),
                        new Track({ id: '2', isSelected: true }),
                        new Track({ id: '3', isSelected: true, rootOfSelection: true }),
                        new Track({ id: '4', isSelected: false })
                    ])
                );
            });
        });
    });
});

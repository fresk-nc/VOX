import tracks from 'reducers/tracks';
import types from 'constants/ActionTypes';
import { List, fromJS } from 'immutable';

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
                fromJS([
                    { id: '1' },
                    { id: '2' }
                ])
            );

            expect(
                tracks(
                    fromJS([
                        { id: '1' },
                        { id: '2' }
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
                fromJS([
                    { id: '1' },
                    { id: '2' },
                    { id: '3' },
                    { id: '4' }
                ])
            );
        });

        it('should handle CLEAR_TRACKS', () => {
            expect(
                tracks(
                    fromJS([
                        { id: '1' },
                        { id: '2' }
                    ]),
                    { type: types.CLEAR_TRACKS }
                )
            ).to.be.equal(List());
        });

        it('should handle REMOVE_TRACK', () => {
            const state = fromJS([
                { id: '1' },
                { id: '2' },
                { id: '3' }
            ]);

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '1' })).to.be.equal(
                fromJS([
                    { id: '2' },
                    { id: '3' }
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '2' })).to.be.equal(
                fromJS([
                    { id: '1' },
                    { id: '3' }
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '3' })).to.be.equal(
                fromJS([
                    { id: '1' },
                    { id: '2' }
                ])
            );

            expect(tracks(state, { type: types.REMOVE_TRACK, id: '4' })).to.be.equal(state);
        });

        it('should handle PLAY_TRACK', () => {
            expect(
                tracks(
                    fromJS([
                        { id: '1', isPlay: false, isCurrent: false },
                        { id: '2', isPlay: false, isCurrent: false }
                    ]),
                    { type: types.PLAY_TRACK, id: '1' }
                )
            ).to.be.equal(
                fromJS([
                    { id: '1', isPlay: true, isCurrent: true },
                    { id: '2', isPlay: false, isCurrent: false }
                ])
            );

            expect(
                tracks(
                    fromJS([
                        { id: '1', isPlay: true, isCurrent: true },
                        { id: '2', isPlay: false, isCurrent: false }
                    ]),
                    { type: types.PLAY_TRACK, id: '2' }
                )
            ).to.be.equal(
                fromJS([
                    { id: '1', isPlay: false, isCurrent: false },
                    { id: '2', isPlay: true, isCurrent: true }
                ])
            );
        });

        it('should handle PAUSE_TRACK', () => {
            expect(
                tracks(
                    fromJS([
                        { id: '1', isPlay: true, isCurrent: true },
                        { id: '2', isPlay: false, isCurrent: false }
                    ]),
                    { type: types.PAUSE_TRACK, id: '1' }
                )
            ).to.be.equal(
                fromJS([
                    { id: '1', isPlay: false, isCurrent: true },
                    { id: '2', isPlay: false, isCurrent: false }
                ])
            );
        });
    });
});

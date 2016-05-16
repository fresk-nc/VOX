import settings from 'reducers/settings';
import types from 'constants/ActionTypes';
import { Map } from 'immutable';

describe('reducers', () => {
    describe('settings', () => {
        it('should handle initial state', () => {
            expect(settings(undefined, {})).to.be.equal(Map({
                minimize: false,
                shuffle: false,
                loopMode: 'off',
                volume: 1
            }));
        });

        it('should handle TOGGLE_MINIMIZE', () => {
            expect(
                settings(
                    Map({ minimize: false }),
                    { type: types.TOGGLE_MINIMIZE }
                )
            ).to.be.equal(Map({ minimize: true }));

            expect(
                settings(
                    Map({ minimize: true }),
                    { type: types.TOGGLE_MINIMIZE }
                )
            ).to.be.equal(Map({ minimize: false }));
        });

        it('should handle TOGGLE_SHUFFLE', () => {
            expect(
                settings(
                    Map({ shuffle: false }),
                    { type: types.TOGGLE_SHUFFLE }
                )
            ).to.be.equal(Map({ shuffle: true }));

            expect(
                settings(
                    Map({ shuffle: true }),
                    { type: types.TOGGLE_SHUFFLE }
                )
            ).to.be.equal(Map({ shuffle: false }));
        });

        it('should handle CHANGE_LOOP_MODE', () => {
            expect(
                settings(
                    Map({ loopMode: 'off' }),
                    { type: types.CHANGE_LOOP_MODE, loopMode: 'all' }
                )
            ).to.be.equal(Map({ loopMode: 'all' }));

            expect(
                settings(
                    Map({ loopMode: 'all' }),
                    { type: types.CHANGE_LOOP_MODE, loopMode: 'one' }
                )
            ).to.be.equal(Map({ loopMode: 'one' }));

            expect(
                settings(
                    Map({ loopMode: 'one' }),
                    { type: types.CHANGE_LOOP_MODE, loopMode: 'off' }
                )
            ).to.be.equal(Map({ loopMode: 'off' }));
        });

        it('should handle CHANGE_VOLUME', () => {
            expect(
                settings(
                    Map({ volume: 1 }),
                    { type: types.CHANGE_VOLUME, volume: 0.5 }
                )
            ).to.be.equal(Map({ volume: 0.5 }));
        });
    });
});

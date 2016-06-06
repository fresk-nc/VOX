import settings from 'reducers/settings';
import types from 'constants/ActionTypes';
import Settings from 'records/Settings';

describe('reducers', () => {
    describe('settings', () => {
        it('should handle initial state', () => {
            expect(settings(undefined, {})).to.be.equal(new Settings());
        });

        it('should handle TOGGLE_MINIMIZE', () => {
            expect(
                settings(
                    new Settings({ minimize: false }),
                    { type: types.TOGGLE_MINIMIZE }
                )
            ).to.be.equal(new Settings({ minimize: true }));

            expect(
                settings(
                    new Settings({ minimize: true }),
                    { type: types.TOGGLE_MINIMIZE }
                )
            ).to.be.equal(new Settings({ minimize: false }));
        });

        it('should handle TOGGLE_SHUFFLE', () => {
            expect(
                settings(
                    new Settings({ shuffle: false }),
                    { type: types.TOGGLE_SHUFFLE }
                )
            ).to.be.equal(new Settings({ shuffle: true }));

            expect(
                settings(
                    new Settings({ shuffle: true }),
                    { type: types.TOGGLE_SHUFFLE }
                )
            ).to.be.equal(new Settings({ shuffle: false }));
        });

        it('should handle CHANGE_LOOP_MODE', () => {
            expect(
                settings(
                    new Settings({ loopMode: 'off' }),
                    { type: types.CHANGE_LOOP_MODE, loopMode: 'all' }
                )
            ).to.be.equal(new Settings({ loopMode: 'all' }));

            expect(
                settings(
                    new Settings({ loopMode: 'all' }),
                    { type: types.CHANGE_LOOP_MODE, loopMode: 'one' }
                )
            ).to.be.equal(new Settings({ loopMode: 'one' }));

            expect(
                settings(
                    new Settings({ loopMode: 'one' }),
                    { type: types.CHANGE_LOOP_MODE, loopMode: 'off' }
                )
            ).to.be.equal(new Settings({ loopMode: 'off' }));
        });

        it('should handle CHANGE_VOLUME', () => {
            expect(
                settings(
                    new Settings({ volume: 1 }),
                    { type: types.CHANGE_VOLUME, volume: 0.5 }
                )
            ).to.be.equal(new Settings({ volume: 0.5 }));
        });
    });
});

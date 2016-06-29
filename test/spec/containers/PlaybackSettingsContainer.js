import { mount } from 'enzyme';

import { PlaybackSettingsContainer } from 'containers/PlaybackSettingsContainer';
import PlaybackSettings from 'components/PlaybackSettings';
import Settings from 'records/Settings';
import player from 'lib/player';

function setup(props) {
    const handlers = {
        toggleShuffle: sinon.spy(),
        changeLoopMode: sinon.spy(),
        changeVolume: sinon.spy()
    };
    const component = mount(
        <PlaybackSettingsContainer {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        playbackSettings: component.find(PlaybackSettings)
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        settings: new Settings()
    }, overrides);
}

describe('containers', () => {
    describe('PlaybackSettingsContainer', () => {
        beforeEach(function() {
            this.sinon.stub(player, 'changeLoopMode');
            this.sinon.stub(player, 'changeVolume');
            this.sinon.stub(player, 'shuffleOn');
        });

        it('should render PlaybackSettings', () => {
            const { playbackSettings } = setup(mockProps());

            expect(playbackSettings).to.have.length(1);
        });

        it('should call changeLoopMode when mount', () => {
            setup(mockProps());
            expect(player.changeLoopMode).to.have.callCount(1);
        });

        it('should call changeVolume when mount', () => {
            setup(mockProps());
            expect(player.changeVolume).to.have.callCount(1);
        });

        it('should not call shuffleOn when mount and shuffle off', () => {
            setup(mockProps());
            expect(player.shuffleOn).to.have.callCount(0);
        });

        it('should call shuffleOn when mount and shuffle on', () => {
            setup(mockProps({
                settings: new Settings({ shuffle: true })
            }));
            expect(player.shuffleOn).to.have.callCount(1);
        });

        it('should call action toggleShuffle with right args when click on shuffle', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleShuffleClick();

            expect(handlers.toggleShuffle).to.have.callCount(1);
            expect(handlers.toggleShuffle).to.be.calledWith(props.settings.shuffle);
        });

        it('should call action changeVolume with right args when volume range change', () => {
            const { component, handlers } = setup(mockProps());
            const instance = component.instance();

            instance._handleVolumeRangeInput({
                target: {
                    value: 0.7
                }
            });

            expect(handlers.changeVolume).to.have.callCount(1);
            expect(handlers.changeVolume).to.be.calledWith(0.7);
        });

        describe('loop mode ->', () => {
            it('should set mode `all` if current mode is `off`', () => {
                const { component, handlers } = setup(mockProps({
                    settings: new Settings({ loopMode: 'off' })
                }));
                const instance = component.instance();

                instance._handleLoopClick();

                expect(handlers.changeLoopMode).to.have.callCount(1);
                expect(handlers.changeLoopMode).to.be.calledWith('all');
            });

            it('should set mode `one` if current mode is `all`', () => {
                const { component, handlers } = setup(mockProps({
                    settings: new Settings({ loopMode: 'all' })
                }));
                const instance = component.instance();

                instance._handleLoopClick();

                expect(handlers.changeLoopMode).to.have.callCount(1);
                expect(handlers.changeLoopMode).to.be.calledWith('one');
            });

            it('should set mode `off` if current mode is `one`', () => {
                const { component, handlers } = setup(mockProps({
                    settings: new Settings({ loopMode: 'one' })
                }));
                const instance = component.instance();

                instance._handleLoopClick();

                expect(handlers.changeLoopMode).to.have.callCount(1);
                expect(handlers.changeLoopMode).to.be.calledWith('off');
            });
        });

        describe('decrement volume ->', () => {
            it('should call action changeVolume with decremented volume', () => {
                const { component, handlers } = setup(mockProps({
                    settings: new Settings({ volume: 1 })
                }));
                const instance = component.instance();

                instance._decrementVolume();

                expect(handlers.changeVolume).to.have.callCount(1);
                expect(handlers.changeVolume).to.be.calledWith(0.95);
            });

            it('should call action changeVolume with 0 when current volume is 0', () => {
                const { component, handlers } = setup(mockProps({
                    settings: new Settings({ volume: 0 })
                }));
                const instance = component.instance();

                instance._decrementVolume();

                expect(handlers.changeVolume).to.have.callCount(1);
                expect(handlers.changeVolume).to.be.calledWith(0);
            });
        });

        describe('increment volume ->', () => {
            it('should call action changeVolume with incremented volume', () => {
                const { component, handlers } = setup(mockProps({
                    settings: new Settings({ volume: 0.75 })
                }));
                const instance = component.instance();

                instance._incrementVolume();

                expect(handlers.changeVolume).to.have.callCount(1);
                expect(handlers.changeVolume).to.be.calledWith(0.8);
            });

            it('should call action changeVolume with 1 when current volume is 1', () => {
                const { component, handlers } = setup(mockProps({
                    settings: new Settings({ volume: 1 })
                }));
                const instance = component.instance();

                instance._incrementVolume();

                expect(handlers.changeVolume).to.have.callCount(1);
                expect(handlers.changeVolume).to.be.calledWith(1);
            });
        });
    });
});

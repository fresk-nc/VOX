import { shallow } from 'enzyme';
import { List } from 'immutable';

import { App } from 'containers/App';
import Status from 'records/Status';
import Track from 'records/Track';
import Settings from 'records/Settings';
import Loading from 'components/Loading';
import PlaybackContainer from 'containers/PlaybackContainer';
import PlaybackBarContainer from 'containers/PlaybackBarContainer';
import PlaylistContainer from 'containers/PlaylistContainer';

function setup(props) {
    const handlers = {
        rehydrateSuccess: sinon.spy()
    };
    const component = shallow(
        <App {...props} {...handlers} />
    );

    return {
        handlers,
        component
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        status: new Status()
    }, overrides);
}

describe('containers', () => {
    describe('App', () => {
        it('should render the Loading component when state is not rehydrated', () => {
            const { component } = setup(mockProps());

            expect(component.find(Loading)).to.have.length(1);
        });

        it('should render the content when state is rehydrated', () => {
            const { component } = setup(mockProps({
                status: new Status({
                    rehydrated: true
                })
            }));

            expect(component.find(Loading)).to.have.length(0);
            expect(component.find(PlaybackContainer)).to.have.length(1);
            expect(component.find(PlaybackBarContainer)).to.have.length(1);
            expect(component.find(PlaylistContainer)).to.have.length(1);
        });

        describe('transform out ->', () => {
            it('should transform tracks', () => {
                const { component } = setup(mockProps());
                const state = [
                    {
                        id: 100,
                        isPlay: true,
                        isSelected: true
                    },
                    {
                        id: 101,
                        isPlay: false,
                        isSelected: false
                    }
                ];
                
                expect(component.instance()._transformOutPersistedState(state, 'tracks'))
                    .to.be.equal(List(
                        [
                            new Track({ id: 100 }),
                            new Track({ id: 101 })
                        ]
                    ));
            });

            it('should transform settings', () => {
                const { component } = setup(mockProps());
                const state = {
                    minimize: true,
                    shuffle: true,
                    loopMode: 'off',
                    volume: 0.5
                };

                expect(component.instance()._transformOutPersistedState(state, 'settings'))
                    .to.be.equal(new Settings(state));
            });

            it('should return undefined for other keys', () => {
                const { component } = setup(mockProps());

                expect(component.instance()._transformOutPersistedState({}, 'any')).to.be.equal(undefined);
            });
        });
    });
});

import { shallow } from 'enzyme';
import { List } from 'immutable';
import _ from 'lodash';

import { SearchContainer } from 'containers/SearchContainer';
import SearchComponent from 'components/Search';
import Search from 'records/Search';
import keyboard from 'constants/KeyboardCodes';

function setup(props) {
    const handlers = {
        selectTrack: sinon.spy(),
        setSearchText: sinon.spy(),
        hideSearch: sinon.spy()
    };
    const component = shallow(
        <SearchContainer {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        search: component.find(SearchComponent)
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        tracks: List(),
        search: new Search()
    }, overrides);
}

describe('containers', () => {
    describe('SearchContainer', () => {
        beforeEach(function() {
            this.sinon.stub(_, 'debounce', (cb) => {
                return function() {
                    cb.apply(null, arguments);
                };
            });
        });

        it('should render Search', () => {
            const { search } = setup(mockProps());

            expect(search).to.have.length(1);
        });

        it('should call action selectTrack with right args when double click on track', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleTrackDoubleClick(100);

            expect(handlers.selectTrack).to.have.callCount(1);
            expect(handlers.selectTrack).to.be.calledWith(100, {
                resetSelected: true
            });
        });

        it('should call action hideSearch when double click on track', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleTrackDoubleClick(100);

            expect(handlers.hideSearch).to.have.callCount(1);
        });

        it('should call action setSearchText with right args when change input', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleInputChange({
                target: {
                    value: 'title of track'
                }
            });

            expect(handlers.setSearchText).to.have.callCount(1);
            expect(handlers.setSearchText).to.be.calledWith('title of track');
        });

        it('should call stopPropagation when key down on input', () => {
            const props = mockProps();
            const { component } = setup(props);
            const instance = component.instance();
            const cb = sinon.spy();

            instance._handleInputKeyDown({ stopPropagation: cb });

            expect(cb).to.have.callCount(1);
        });

        it('should call action setSearchText with right args when click on `input cleaner`', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const instance = component.instance();

            instance._handleInputCleanerClick();

            expect(handlers.setSearchText).to.have.callCount(1);
            expect(handlers.setSearchText).to.be.calledWith(null);
        });

        describe('hotkeys ->', () => {
            it('should call action hideSearch when key is ESCAPE', () => {
                const props = mockProps();
                const { component, handlers } = setup(props);
                const instance = component.instance();

                instance._handleInputKeyDown({
                    stopPropagation: sinon.spy(),
                    which: keyboard.ESCAPE
                });

                expect(handlers.hideSearch).to.have.callCount(1);
            });

            it('should not call action hideSearch when key is not ESCAPE', () => {
                const props = mockProps();
                const { component, handlers } = setup(props);
                const instance = component.instance();

                instance._handleInputKeyDown({
                    stopPropagation: sinon.spy(),
                    which: 'any'
                });

                expect(handlers.hideSearch).to.have.callCount(0);
            });
        });
    });
});

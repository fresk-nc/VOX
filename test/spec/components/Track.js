import { shallow } from 'enzyme';

import TrackComponent from 'components/Track';
import Track from 'records/Track';
import styles from 'components/Track/Track.styl';

function setup(props) {
    const handlers = {
        onClick: sinon.spy(),
        onDoubleClick: sinon.spy(),
        onContextMenu: sinon.spy(),
        onDropHover: sinon.spy(),
        connectDropTarget: (el) => el,
        connectDragSource: (el) => el
    };
    const component = shallow(
        <TrackComponent.DecoratedComponent.DecoratedComponent {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        index: component.find(`.${styles.index}`),
        title: component.find(`.${styles.title}`),
        artist: component.find(`.${styles.artist}`),
        duration: component.find(`.${styles.duration}`)
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        index: 1,
        isDragging: false,
        track: new Track({
            title: 'title',
            artist: 'artist',
            duration: 220
        })
    }, overrides);
}

describe('components', () => {
    describe('Track', () => {
        it('should render the current track when track is current', () => {
            const { component } = setup(mockProps({
                track: new Track({ isCurrent: true })
            }));

            expect(component.hasClass(styles.current)).to.be.equal(true);
            expect(component.hasClass(styles.selected)).to.be.equal(false);
        });

        it('should render the common track when track is not current', () => {
            const { component } = setup(mockProps());

            expect(component.hasClass(styles.common)).to.be.equal(true);
            expect(component.hasClass(styles.current)).to.be.equal(false);
            expect(component.hasClass(styles.selected)).to.be.equal(false);
        });

        it('should render the selected track when track is selected', () => {
            const { component } = setup(mockProps({
                track: new Track({ isSelected: true })
            }));

            expect(component.hasClass(styles.current)).to.be.equal(false);
            expect(component.hasClass(styles.selected)).to.be.equal(true);
        });

        it('should render the index of track', () => {
            const props = mockProps();
            const { index } = setup(props);

            expect(Number(index.text())).to.be.equal(props.index);
        });

        it('should render the title of track', () => {
            const props = mockProps();
            const { title } = setup(props);

            expect(title.text()).to.be.equal(props.track.title);
        });

        it('should render the artist of track', () => {
            const props = mockProps();
            const { artist } = setup(props);

            expect(artist.text()).to.be.equal(props.track.artist);
        });

        it('should render the formatted duration of track', () => {
            const props = mockProps();
            const { duration } = setup(props);

            expect(duration.text()).to.be.equal('3:40');
        });

        it('should call handler onClick with right args when click on track', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);
            const event = {};

            component.simulate('click', event);

            expect(handlers.onClick).to.have.callCount(1);
            expect(handlers.onClick).to.be.calledWith(event, props.track.id);
        });

        it('should call handler onDoubleClick with right args when double click on track', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);

            component.simulate('doubleClick');

            expect(handlers.onDoubleClick).to.have.callCount(1);
            expect(handlers.onDoubleClick).to.be.calledWith(props.track.id);
        });

        it('should call handler onContextMenu with right args when right click on track', () => {
            const props = mockProps();
            const { component, handlers } = setup(props);

            component.simulate('contextMenu');

            expect(handlers.onContextMenu).to.have.callCount(1);
            expect(handlers.onContextMenu).to.be.calledWith(props.track);
        });
    });
});

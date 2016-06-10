import Track from 'components/Track';
import styles from 'components/Track/Track.styl';
import { shallow } from 'enzyme';

function setup(props) {
    const handlers = {
        onClick: sinon.spy(),
        onDoubleClick: sinon.spy(),
        onContextMenu: sinon.spy()
    };
    const component = shallow(
        <Track {...props} {...handlers} />
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

function mockTrack(overrides) {
    return Object.assign({}, {
        index: 1,
        title: 'title',
        artist: 'artist',
        duration: 220,
        isCurrent: false,
        isSelected: false
    }, overrides);
}

describe('components', () => {
    describe('Track', () => {
        it('should render the current track when track is current', () => {
            const { component } = setup(mockTrack({ isCurrent: true }));

            expect(component.hasClass(styles.current)).to.be.equal(true);
            expect(component.hasClass(styles.selected)).to.be.equal(false);
        });

        it('should render the common track when track is not current', () => {
            const { component } = setup(mockTrack());

            expect(component.hasClass(styles.common)).to.be.equal(true);
            expect(component.hasClass(styles.current)).to.be.equal(false);
            expect(component.hasClass(styles.selected)).to.be.equal(false);
        });

        it('should render the selected track when track is selected', () => {
            const { component } = setup(mockTrack({ isSelected: true }));

            expect(component.hasClass(styles.current)).to.be.equal(false);
            expect(component.hasClass(styles.selected)).to.be.equal(true);
        });

        it('should render the index of track', () => {
            const track = mockTrack();
            const { index } = setup(track);

            expect(Number(index.text())).to.be.equal(track.index);
        });

        it('should render the title of track', () => {
            const track = mockTrack();
            const { title } = setup(track);

            expect(title.text()).to.be.equal(track.title);
        });

        it('should render the artist of track', () => {
            const track = mockTrack();
            const { artist } = setup(track);

            expect(artist.text()).to.be.equal(track.artist);
        });

        it('should render the formatted duration of track', () => {
            const track = mockTrack();
            const { duration } = setup(track);

            expect(duration.text()).to.be.equal('3:40');
        });

        it('should call handler onClick on track click', () => {
            const { component, handlers } = setup(mockTrack());

            component.simulate('click');

            expect(handlers.onClick).to.have.callCount(1);
        });

        it('should call handler onDoubleClick on track double click', () => {
            const { component, handlers } = setup(mockTrack());

            component.simulate('doubleClick');

            expect(handlers.onDoubleClick).to.have.callCount(1);
        });

        it('should call handler onContextMenu on track right click', () => {
            const { component, handlers } = setup(mockTrack());

            component.simulate('contextMenu');

            expect(handlers.onContextMenu).to.have.callCount(1);
        });
    });
});

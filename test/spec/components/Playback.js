import { shallow } from 'enzyme';

import Playback from 'components/Playback';
import styles from 'components/Playback/Playback.styl';
import compoundSelector from '../../helpers/compoundSelector';
import Track from 'records/Track';

function setup(props) {
    const handlers = {
        onProgressClick: sinon.spy(),
        onProgressMouseDown: sinon.spy(),
        onQuitClick: sinon.spy()
    };
    const component = shallow(
        <Playback {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        quit: component.find(compoundSelector(styles.quit)),
        logo: component.find(compoundSelector(styles.logo)),
        content: component.find(compoundSelector(styles.content)),
        artist: component.find(compoundSelector(styles.artist)),
        album: component.find(compoundSelector(styles.album)),
        title: component.find(compoundSelector(styles.title)),
        time: component.find(compoundSelector(styles.time)),
        progressBar: component.find('.js-progress-bar'),
        progressLine: component.find(compoundSelector(styles.progressLine))
    };
}

function mockProps(overrides) {
    return Object.assign({}, {
        currentTrack: new Track({
            artist: 'artist',
            album: 'album',
            title: 'title',
            duration: 300
        }),
        isChangingTime: false,
        currentTime: 150,
        progress: 50
    }, overrides);
}

describe('components', () => {
    describe('Playback', () => {
        it('should render the quit', () => {
            const { quit } = setup(mockProps());

            expect(quit).to.have.length(1);
        });

        it('should call handler onQuitClick on quit click', () => {
            const { quit, handlers } = setup(mockProps());

            quit.simulate('click');

            expect(handlers.onQuitClick).to.have.callCount(1);
        });

        it('should render logo instead content when there is no a current track', () => {
            const { logo, content } = setup(mockProps({ currentTrack: null }));

            expect(logo).to.have.length(1);
            expect(content).to.have.length(0);
        });

        it('should render content instead logo when there is a current track', () => {
            const { logo, content } = setup(mockProps());

            expect(logo).to.have.length(0);
            expect(content).to.have.length(1);
        });

        it('should render album of the current track', () => {
            const props = mockProps();
            const { album } = setup(props);

            expect(album.text()).to.be.equal(props.currentTrack.album);
        });

        it('should render title of the current track', () => {
            const props = mockProps();
            const { title } = setup(props);

            expect(title.text()).to.be.equal(props.currentTrack.title);
        });

        it('should render formatted time of the current track', () => {
            const { time } = setup(mockProps());

            expect(time.text()).to.be.equal('- 2:30');
        });

        it('should render progress bar without tumbler when time is no changing', () => {
            const { progressBar } = setup(mockProps());

            expect(progressBar.hasClass(styles.progress)).to.be.equal(true);
        });

        it('should render progress bar with tumbler when time is changing', () => {
            const { progressBar } = setup(mockProps({ isChangingTime: true }));

            expect(progressBar.hasClass(styles.progressActive)).to.be.equal(true);
        });

        it('should call handler onProgressClick on progress click', () => {
            const { progressBar, handlers } = setup(mockProps());

            progressBar.simulate('click');

            expect(handlers.onProgressClick).to.have.callCount(1);
        });

        it('should call handler onProgressMouseDown on progress mouse down', () => {
            const { progressBar, handlers } = setup(mockProps());

            progressBar.simulate('mouseDown');

            expect(handlers.onProgressMouseDown).to.have.callCount(1);
        });

        it('should render the progress line with a width equal to the current progress', () => {
            const props = mockProps();
            const { progressLine } = setup(props);

            expect(progressLine.props().style.width).to.be.equal(`${props.progress}%`);
        });
    });
});

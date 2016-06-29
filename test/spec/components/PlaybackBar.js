import PlaybackBar from 'components/PlaybackBar';
import styles from 'components/PlaybackBar/PlaybackBar.styl';
import compoundSelector from '../../helpers/compoundSelector';
import { shallow } from 'enzyme';

function setup(props) {
    const handlers = {
        onPauseClick: sinon.spy(),
        onPlayClick: sinon.spy(),
        onPrevClick: sinon.spy(),
        onNextClick: sinon.spy(),
        onMinimizeClick: sinon.spy(),
        onSearchClick: sinon.spy()
    };
    const component = shallow(
        <PlaybackBar {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        //minimize: component.find(compoundSelector(styles.minimize)),
        prev: component.find(compoundSelector(styles.prev)),
        play: component.find(compoundSelector(styles.play)),
        next: component.find(compoundSelector(styles.next)),
        search: component.find(compoundSelector(styles.search))
    };
}

describe('components', () => {
    describe('PlaybackBar', () => {
        // @see https://github.com/airbnb/enzyme/issues/413
        /*
        it('should render minimize button', () => {
            const { minimize } = setup({ play: false });

            expect(minimize).to.have.length(1);
        });
        */

        it('should render prev button', () => {
            const { prev } = setup({ play: false });

            expect(prev).to.have.length(1);
        });

        it('should call handler onPrevClick on prev button click', () => {
            const { prev, handlers } = setup({ play: false });

            prev.simulate('click');

            expect(handlers.onPrevClick).to.have.callCount(1);
        });

        it('should render play button with play icon when player is not playing', () => {
            const { play } = setup({ play: false });

            expect(play).to.have.length(1);
            expect(play.find('.material-icons').text()).to.be.equal('play_arrow');
        });

        it('should render play button with pause icon when player is playing', () => {
            const { play } = setup({ play: true });

            expect(play).to.have.length(1);
            expect(play.find('.material-icons').text()).to.be.equal('pause');
        });

        it('should call handler onPlayClick on play button click when player is not playing', () => {
            const { play, handlers } = setup({ play: false });

            play.simulate('click');

            expect(handlers.onPlayClick).to.have.callCount(1);
        });

        it('should call handler onPauseClick on play button click when player is playing', () => {
            const { play, handlers } = setup({ play: true });

            play.simulate('click');

            expect(handlers.onPauseClick).to.have.callCount(1);
        });

        it('should render next button', () => {
            const { next } = setup({ play: false });

            expect(next).to.have.length(1);
        });

        it('should call handler onNextClick on next button click', () => {
            const { next, handlers } = setup({ play: false });

            next.simulate('click');

            expect(handlers.onNextClick).to.have.callCount(1);
        });

        it('should render search button', () => {
            const { search } = setup({ play: false });

            expect(search).to.have.length(1);
        });

        it('should call handler onSearchClick on search button click', () => {
            const { search, handlers } = setup({ play: false });

            search.simulate('click');

            expect(handlers.onSearchClick).to.have.callCount(1);
        });
    });
});

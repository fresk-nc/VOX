import { List } from 'immutable';

import Search from 'components/Search';
import styles from 'components/Search/Search.styl';
import compoundSelector from '../../helpers/compoundSelector';
import { mountWithIntl } from '../../helpers/intlEnzyme';
import Track from 'records/Track';

function setup(props) {
    const handlers = {
        onInputCleanerClick: sinon.spy(),
        onInputChange: sinon.spy(),
        onInputKeyDown: sinon.spy(),
        onTrackDoubleClick: sinon.spy(),
        onOverlayClick: sinon.spy()
    };
    const component = mountWithIntl(
        <Search {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        overlay: component.find(compoundSelector(styles.overlay)),
        input: component.find(compoundSelector(styles.input)),
        inputCleaner: component.find(compoundSelector(styles.inputCleaner)),
        notFound: component.find(compoundSelector(styles.notFound)),
        track: component.find(compoundSelector(styles.track))
    };
}

function mockSearch(overrides) {
    return Object.assign({}, {
        tracks: List(),
        searchText: null
    }, overrides);
}

describe('components', () => {
    describe('Search', () => {
        it('should render the overlay', () => {
            const { overlay } = setup(mockSearch());

            expect(overlay).to.have.length(1);
        });

        it('should call handler onOverlayClick on overlay click', () => {
            const { overlay, handlers } = setup(mockSearch());

            overlay.simulate('click');

            expect(handlers.onOverlayClick).to.have.callCount(1);
        });

        it('should render the input', () => {
            const { input } = setup(mockSearch());

            expect(input).to.have.length(1);
        });

        it('should call handler onInputChange on input change', () => {
            const { input, handlers } = setup(mockSearch());

            input.simulate('change');

            expect(handlers.onInputChange).to.have.callCount(1);
        });

        it('should call handler onInputKeyDown on key down', () => {
            const { input, handlers } = setup(mockSearch());

            input.simulate('keyDown');

            expect(handlers.onInputKeyDown).to.have.callCount(1);
        });

        it('should not render the inputCleaner when there is no the search text', () => {
            const { inputCleaner } = setup(mockSearch());

            expect(inputCleaner).to.have.length(0);
        });

        it('should render the inputCleaner when there is the search text', () => {
            const { inputCleaner } = setup(mockSearch({ searchText: 'not empty' }));

            expect(inputCleaner).to.have.length(1);
        });

        it('should call handler onInputCleanerClick on inputCleaner click', () => {
            const { inputCleaner, handlers } = setup(mockSearch({ searchText: 'not empty' }));

            inputCleaner.simulate('click');

            expect(handlers.onInputCleanerClick).to.have.callCount(1);
        });

        it('should render notFound when not find the tracks', () => {
            const { notFound } = setup(mockSearch({ searchText: 'not empty' }));

            expect(notFound).to.have.length(1);
        });

        it('should render the tracks found', () => {
            const { track } = setup(mockSearch({
                searchText: 'not empty',
                tracks: List([
                    new Track({
                        id: '100',
                        title: 'title',
                        artist: 'artist',
                        album: 'album',
                        duration: 200
                    }),
                    new Track({
                        id: '101',
                        title: 'title',
                        artist: 'artist',
                        album: 'album',
                        duration: 200
                    })
                ])
            }));

            expect(track).to.have.length(2);
        });

        it('should call handler onTrackDoubleClick on track double click', () => {
            const { track, handlers } = setup(mockSearch({
                searchText: 'not empty',
                tracks: List([
                    new Track({
                        id: '100',
                        title: 'title',
                        artist: 'artist',
                        album: 'album',
                        duration: 200
                    })
                ])
            }));

            track.simulate('doubleClick');

            expect(handlers.onTrackDoubleClick).to.have.callCount(1);
        });
    });
});

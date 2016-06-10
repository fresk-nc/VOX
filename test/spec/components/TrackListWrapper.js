import TrackListWrapper from 'components/TrackListWrapper';
import TrackList from 'components/TrackList';
import { shallow } from 'enzyme';

function setup() {
    const component = shallow(
        <TrackListWrapper>
            <TrackList
                onTrackClick={sinon.spy()}
                onTrackDoubleClick={sinon.spy()}
                onTrackContextMenu={sinon.spy()}
                tracks={[]}
            />
        </TrackListWrapper>
    );

    return {
        component
    };
}

describe('components', () => {
    describe('TrackListWrapper', () => {
        it('should render children', () => {
            const { component } = setup();

            expect(component.find(TrackList)).to.have.length(1);
        });
    });
});

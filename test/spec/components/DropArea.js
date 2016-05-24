import DropArea from 'components/DropArea';
import styles from 'components/DropArea/DropArea.styl';
import { shallow } from 'enzyme';

function setup() {
    const handlers = {
        onDropEnd: sinon.spy(),
        connectDropTarget: (el) => el
    };
    const component = shallow(
        <DropArea.DecoratedComponent {...handlers} />
    );

    return {
        component,
        title: component.find(`.${styles.title}`),
        detail: component.find(`.${styles.detail}`)
    };
}

describe('components', () => {
    describe('DropArea', () => {
        it('should render title', () => {
            const { title } = setup();

            expect(title).to.have.length(1);
        });

        it('should render detail', () => {
            const { detail } = setup();

            expect(detail).to.have.length(1);
        });
    });
});

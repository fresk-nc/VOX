import Toolbar from 'components/Toolbar';
import styles from 'components/Toolbar/Toolbar.styl';
import { shallow } from 'enzyme';

function setup(props) {
    const handlers = {
        onAddClick: sinon.spy(),
        onClearClick: sinon.spy()
    };
    const component = shallow(
        <Toolbar {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        addButton: component.children().at(0),
        clearButton: component.children().at(1)
    };
}

describe('components', () => {
    describe('Toolbar', () => {
        it('should render the add button', () => {
            const { addButton } = setup({ trackCount: 1 });

            expect(addButton).to.have.length(1);
        });

        it('should call handler onAddClick on add button click', () => {
            const { addButton, handlers } = setup({ trackCount: 1 });

            addButton.simulate('click');

            expect(handlers.onAddClick).to.have.callCount(1);
        });

        it('should render the clear button', () => {
            const { clearButton } = setup({ trackCount: 1 });

            expect(clearButton).to.have.length(1);
        });

        it('should render the disabled clear button when there are no tracks', () => {
            const { clearButton } = setup({ trackCount: 0 });

            expect(clearButton.hasClass(styles.disableButton)).to.be.equal(true);
        });

        it('should call handler onClearClick on clear button click', () => {
            const { clearButton, handlers } = setup({ trackCount: 1 });

            clearButton.simulate('click');

            expect(handlers.onClearClick).to.have.callCount(1);
        });
    });
});

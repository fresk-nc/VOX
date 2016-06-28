import Loading from 'components/Loading';
import styles from 'components/Loading/Loading.styl';
import { shallowWithIntl } from '../../helpers/intlEnzyme';
import compoundSelector from '../../helpers/compoundSelector';

function setup(props) {
    const component = shallowWithIntl(
        <Loading {...props} />
    );

    return {
        component,
        title: component.find(compoundSelector(styles.title)),
        spinner: component.find(compoundSelector(styles.spinner))
    };
}

describe('components', () => {
    describe('Loading', () => {
        it('should render title', () => {
            const { title } = setup();

            expect(title).to.have.length(1);
        });

        it('should render spinner', () => {
            const { spinner } = setup();

            expect(spinner).to.have.length(1);
        });
    });
});

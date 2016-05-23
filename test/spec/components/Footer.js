import Footer from 'components/Footer';
import { mountWithIntl } from '../../helpers/intl-enzyme';

function setup(props) {
    const component = mountWithIntl(
        <Footer {...props} />
    );

    return {
        component
    };
}

describe('components', () => {
    describe('Footer', () => {
        it('should render info about tracks', () => {
            const { component } = setup({
                trackCount: 3,
                totalDuration: 1000
            });

            expect(component.text()).to.be.equal('3 Tracks, 16 min 40 sec');
        });
    });
});

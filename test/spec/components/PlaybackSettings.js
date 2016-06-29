import PlaybackSettings from 'components/PlaybackSettings';
import styles from 'components/PlaybackSettings/PlaybackSettings.styl';
import compoundSelector from '../../helpers/compoundSelector';
import { shallow } from 'enzyme';

function setup(props) {
    const handlers = {
        onShuffleClick: sinon.spy(),
        onLoopClick: sinon.spy(),
        onVolumeMinusMouseDown: sinon.spy(),
        onVolumeMinusMouseUp: sinon.spy(),
        onVolumePlusMouseDown: sinon.spy(),
        onVolumePlusMouseUp: sinon.spy(),
        onVolumeRangeInput: sinon.spy()
    };
    const component = shallow(
        <PlaybackSettings {...props} {...handlers} />
    );

    return {
        handlers,
        component,
        repeatButton: component.find('.js-repeat-button'),
        shuffleButton: component.find('.js-shuffle-button'),
        volumeMinus: component.find('.js-volume-minus'),
        volumePlus: component.find('.js-volume-plus'),
        volumeRange: component.find(compoundSelector(styles.volumeRange))
    };
}

function mockSettings(overrides) {
    return Object.assign({}, {
        isShuffle: false,
        loopMode: 'off',
        volume: 1,
        volumeMin: 0,
        volumeMax: 1,
        volumeStep: 0.05
    }, overrides);
}

describe('components', () => {
    describe('PlaybackSettings', () => {
        it('should render the repeat button', () => {
            const { repeatButton } = setup(mockSettings());

            expect(repeatButton).to.have.length(1);
        });

        it('repeat button should has class `repeat` when loop mode is `off`', () => {
            const { repeatButton } = setup(mockSettings());

            expect(repeatButton.hasClass(styles.repeat)).to.be.equal(true);
        });

        it('repeat button should has class `repeatActive` when loop mode is no `off`', () => {
            const { repeatButton } = setup(mockSettings({ loopMode: 'one' }));

            expect(repeatButton.hasClass(styles.repeatActive)).to.be.equal(true);
        });

        it('should render the repeat button with `repeat_one` icon when loop mode is `one`', () => {
            const { repeatButton } = setup(mockSettings({ loopMode: 'one' }));

            expect(repeatButton.find('.material-icons').text()).to.be.equal('repeat_one');
        });

        it('should render the repeat button with `repeat` icon when loop mode is no `one`', () => {
            const { repeatButton } = setup(mockSettings({ loopMode: 'all' }));

            expect(repeatButton.find('.material-icons').text()).to.be.equal('repeat');
        });

        it('should call handler onLoopClick on repeat button click', () => {
            const { repeatButton, handlers } = setup(mockSettings());

            repeatButton.simulate('click');

            expect(handlers.onLoopClick).to.have.callCount(1);
        });

        it('shuffle button should has class `shuffle` when shuffle mode is off', () => {
            const { shuffleButton } = setup(mockSettings());

            expect(shuffleButton.hasClass(styles.shuffle)).to.be.equal(true);
        });

        it('shuffle button should has class `shuffleActive` when shuffle mode is on', () => {
            const { shuffleButton } = setup(mockSettings({ isShuffle: true }));

            expect(shuffleButton.hasClass(styles.shuffleActive)).to.be.equal(true);
        });

        it('should call handler onShuffleClick on shuffle button click', () => {
            const { shuffleButton, handlers } = setup(mockSettings());

            shuffleButton.simulate('click');

            expect(handlers.onShuffleClick).to.have.callCount(1);
        });

        it('should render the volume minus', () => {
            const { volumeMinus } = setup(mockSettings());

            expect(volumeMinus).to.have.length(1);
        });

        it('should call handler onVolumeMinusMouseDown on volume minus mouse down', () => {
            const { volumeMinus, handlers } = setup(mockSettings());

            volumeMinus.simulate('mouseDown');

            expect(handlers.onVolumeMinusMouseDown).to.have.callCount(1);
        });

        it('should call handler onVolumeMinusMouseUp on volume minus mouse up', () => {
            const { volumeMinus, handlers } = setup(mockSettings());

            volumeMinus.simulate('mouseUp');

            expect(handlers.onVolumeMinusMouseUp).to.have.callCount(1);
        });

        it('should render the volume plus', () => {
            const { volumePlus } = setup(mockSettings());

            expect(volumePlus).to.have.length(1);
        });

        it('should call handler onVolumePlusMouseDown on volume plus mouse down', () => {
            const { volumePlus, handlers } = setup(mockSettings());

            volumePlus.simulate('mouseDown');

            expect(handlers.onVolumePlusMouseDown).to.have.callCount(1);
        });

        it('should call handler onVolumePlusMouseUp on volume plus mouse up', () => {
            const { volumePlus, handlers } = setup(mockSettings());

            volumePlus.simulate('mouseUp');

            expect(handlers.onVolumePlusMouseUp).to.have.callCount(1);
        });

        it('should render the volume range', () => {
            const { volumeRange } = setup(mockSettings());

            expect(volumeRange).to.have.length(1);
        });

        it('should call handler onVolumeRangeInput on volume range input', () => {
            const { volumeRange, handlers } = setup(mockSettings());

            volumeRange.simulate('input');

            expect(handlers.onVolumeRangeInput).to.have.callCount(1);
        });
    });
});

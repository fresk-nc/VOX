import mediaFileLoader from 'lib/mediaFileLoader';

const { nativeImage } = require('electron').remote;

export default {
    load(filename) {
        return mediaFileLoader.loadFile(filename).then((data) => {
            if (data && data.picture) {
                return nativeImage.createFromBuffer(data.picture).toDataURL();
            }

            return null;
        });
    }
};

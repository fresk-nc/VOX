window.process = window.parent.process;
window.require = window.parent.require;

require('moment-duration-format');

// require all test files
requireTestFiles();

// require src files
requireSrcFiles();

function requireTestFiles() {
    const context = require.context('./spec', true, /\.js$/);
    context.keys().forEach(context);
}

function requireSrcFiles() {
    let srcContext;

    srcContext = require.context('../app/actions', true, /\.js$/);
    srcContext.keys().forEach(srcContext);

    srcContext = require.context('../app/components', true, /\.js$/);
    srcContext.keys().forEach(srcContext);

    srcContext = require.context('../app/containers', true, /\.js$/);
    srcContext.keys().forEach(srcContext);

    srcContext = require.context('../app/lib', true, /\.js$/);
    srcContext.keys().forEach(srcContext);

    srcContext = require.context('../app/reducers', true, /\.js$/);
    srcContext.keys().forEach(srcContext);
}

beforeEach(function() {
    this.sinon = sinon.sandbox.create();
});

afterEach(function() {
    this.sinon.restore();
    clearTestContext(this);
});

function clearTestContext(context) {
    if (!context || typeof context !== 'object') {
        return;
    }

    for (let property in context) {
        if (context.hasOwnProperty(property)) {
            delete context[property];
        }
    }
}

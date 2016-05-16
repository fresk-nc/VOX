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

import storage from 'lib/storage';

describe('lib', () => {
    describe('storage', () => {
        describe('getItem', () => {
            beforeEach(function() {
                this.sinon.stub(storage._storage, 'getItem');
            });

            it('should call callback with right args', function() {
                const settings = { minimize: false };
                const cb = this.sinon.spy();

                storage._storage.getItem.returns(settings);

                storage.getItem('settings', cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(null, settings);
            });

            it('should call callback with error', function() {
                const error = { message: 'error' };
                const cb = this.sinon.spy();

                storage._storage.getItem.throws(error);

                storage.getItem('settings', cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(error);
            });
        });

        describe('setItem', () => {
            beforeEach(function() {
                this.sinon.stub(storage._storage, 'setItem');
            });

            it('should set item', function() {
                const cb = this.sinon.spy();

                storage.setItem('key', 'value', cb);

                expect(storage._storage.setItem).to.have.callCount(1);
                expect(storage._storage.setItem).to.be.calledWith('key', 'value');
            });

            it('should call callback with right args', function() {
                const cb = this.sinon.spy();

                storage.setItem('key', 'value', cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(null);
            });

            it('should call callback with error', function() {
                const error = { message: 'error' };
                const cb = this.sinon.spy();

                storage._storage.setItem.throws(error);

                storage.setItem('key', 'value', cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(error);
            });
        });

        describe('removeItem', () => {
            beforeEach(function() {
                this.sinon.stub(storage._storage, 'removeItem');
            });

            it('should remove item', function() {
                const cb = this.sinon.spy();

                storage.removeItem('key', cb);

                expect(storage._storage.removeItem).to.have.callCount(1);
                expect(storage._storage.removeItem).to.be.calledWith('key');
            });

            it('should call callback with right args', function() {
                const cb = this.sinon.spy();

                storage.removeItem('key', cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(null);
            });

            it('should call callback with error', function() {
                const error = { message: 'error' };
                const cb = this.sinon.spy();

                storage._storage.removeItem.throws(error);

                storage.removeItem('key', cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(error);
            });
        });

        describe('getAllKeys', () => {
            beforeEach(function() {
                this.sinon.stub(storage._storage, 'length', 2);
                this.sinon.stub(storage._storage, 'key');
            });

            it('should call callback with right args', function() {
                const cb = this.sinon.spy();

                storage._storage.key
                    .withArgs(0).returns('key1')
                    .withArgs(1).returns('key2');

                storage.getAllKeys(cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(null, [ 'key1', 'key2' ]);
            });

            it('should call callback with error', function() {
                const error = { message: 'error' };
                const cb = this.sinon.spy();

                storage._storage.key.throws(error);

                storage.getAllKeys(cb);

                expect(cb).to.have.callCount(1);
                expect(cb).to.be.calledWith(error);
            });
        });
    });
});

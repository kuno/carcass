var carcass = require('carcass');
var should = require('should');

describe('Storages / Cradle:', function() {
    it('should be a function.', function() {
        carcass.storages.should.have.property('cradle');
        carcass.storages.cradle.should.be.a('function');
    });

    it('should return an object.', function() {
        carcass.storages.cradle().should.be.a('object');
    });

    describe('A storage', function() {

        var storage = carcass.storages.cradle({
            id: 'lorem',
            database: 'lorem'
        });

        describe('Install', function() {
            it('should be able to install', function(done) {
                storage.install(function(err, res) {
                    should.not.exist(err);
                    res.should.eql({
                        ok: true
                    });
                    done();
                });
            });
        });

        describe('CRUD', function() {});

        describe('Uninstall', function() {
            it('should be able to uninstall', function(done) {
                storage.uninstall(function(err, res) {
                    should.not.exist(err);
                    res.should.eql({
                        ok: true
                    });
                    done();
                });
            });
        });
    });
});

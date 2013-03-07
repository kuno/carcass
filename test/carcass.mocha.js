var carcass = require('carcass');
var should = require('should');

describe('Carcass', function() {
    it('should be an object with some methods.', function() {
        carcass.should.be.a('object');
        carcass.should.have.property('register');
        carcass.should.have.property('mixable');
        carcass.should.have.property('deferred');
        carcass.should.have.property('promise');
        carcass.should.have.property('seed');
    });

    // TODO
    it('should have some utils.', function() {
        carcass.should.have.property('utils');
    });

    // TODO
    it('should have some plugins.', function() {
        carcass.should.have.property('plugins');
    });

    // TODO
    it('should have some constructors.', function() {
        carcass.should.have.property('constructors');
    });

    // TODO
    it('should have some factories.', function() {
        carcass.should.have.property('factories');
    });

    // TODO
    it('should have some applications.', function() {
        carcass.should.have.property('applications');
    });

    // TODO: more.
});

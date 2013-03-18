var debug = require('debug')('carcass:Factory:Storage');

var carcass = require('carcass');
var seed = carcass.seed;
var _ = require('underscore');

// Storage
// ---
// Abstract factory; returns a concrete factory.

// .
module.exports = function(args) {
    debug('building');

    args = args || {};

    // The concrete factory.
    function builder(options) {
        // .
        var Store = args.store || seed.Store;

        // TODO: inherit / rebuild custom methods.

        // .
        var instance = new Store(options);

        // XXX
        // Get ID from data.
        // Requires data; either an object with an id or just an id.
        // Returns an id or nothing; doesn't return any error.
        instance.getId = function(data, callback) {
            if (!data) return callback();
            switch (typeof data) {
            case 'object':
                return callback(data._id || data.id);
            case 'number':
                // TODO: convert to string.
            case 'string':
                return callback(data);
            }
            callback();
        };

        return instance;
    };

    return builder;
};

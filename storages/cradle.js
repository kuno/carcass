var debug = require('debug')('carcass:Storage:Cradle');

var carcass = require('carcass');
var cradle = require('cradle');
var _ = require('underscore');

var noop = function(err) {
    if (err) debug(err);
};
var machineName = carcass.utils.machineName;

// Cradle
// ---
// @see https://github.com/cloudhead/cradle

// Requires:
// * cradle (npm install cradle)

// Notes:
// * `_id` in CouchDB is a special field.

// Default options:
// * host: 127.0.0.1,
// * port: 5984,
// * auth: null,
// * cache: true,
// * raw: false,
// * timeout: 0,
// * secure: false,
// * headers: {}

module.exports = carcass.factories.Storage({
    title: 'Cradle',
    cache: 'cradle',
    initialize: initialize
});

function initialize(instance, options) {
    debug('initializing');

    // Id is optional. But..

    instance.connection = new cradle.Connection(options);

    if (!options.database) {
        // TODO: info or debug.
        return;
    }

    // TODO: prefix.

    // .
    var db = instance.db = instance.connection.database(options.database);

    // TODO
    db.putDesignDocs = function(doc, callback) {
        callback();
    };

    // .
    instance.install = function(options, callback) {
        if ('function' === typeof options) {
            callback = options;
            options = {};
        }
        db.create(callback);
    };

    // .
    instance.uninstall = function(options, callback) {
        if ('function' === typeof options) {
            callback = options;
            options = {};
        }
        db.destroy(callback);
    };
};

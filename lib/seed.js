var debug = require('debug')('carcass:Seed');

var seed = require('seed');
var deferred = require('./deferred');

// Store
// ---
var Store = seed.Store;

// A new sync.
Store.prototype.ensureSync = function(options) {
    var def = deferred();

    // TODO: requires action, data, and collection.

    var op = function() {
        return deferred(new Error('invalid action'));
    };

    // TODO: build shortcuts.
    switch (options.action) {
    case 'del':
    case 'remove':
    case 'delete':
    case 'destroy':
        op = this.destroy || op;
        break;
    case 'set':
    case 'put':
    case 'save':
    case 'create':
    case 'update':
        op = this.set || op;
        break;
    case 'get':
    case 'read':
        op = this.get || op;
        break;
    }

    // Seed's actions return promises from another library. We exchange it with
    // deferred.
    op.call(this, {
        data: options.data,
        collection: options.collection,
        query: options.query || {}
    }).then(def.resolve, def.resolve);

    return def.promise;
};

module.exports = seed;

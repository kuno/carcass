var debug = require('debug')('carcass:Seed');

var seed = require('seed');
var deferred = require('./deferred');

// Store
// ---
var Store = seed.Store;

// A new sync.
// Seed's actions return promises from another library. We exchange it with
// deferred.
Store.prototype.ensureSync = function(options) {
    var def = deferred();

    // TODO: requires action, data, and collection.

    this[options.action]({
        data: options.data,
        collection: options.collection,
        query: options.query || {}
    }).then(def.resolve, def.resolve);

    return def.promise;
};

module.exports = seed;

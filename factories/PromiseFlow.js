var debug = require('debug')('carcass:PromiseFlow');

var carcass = require('carcass');
var deferred = carcass.deferred;

// PromiseFlow
// ---
// ...

// Returns a function, which can be used directly, or as a layer in another
// promiseFlow.

// TODO: comments.

module.exports = function() {
    function promiseFlow(result) {
        return promiseFlow.handle(result);
    }

    promiseFlow.use = use;

    promiseFlow.handle = handle;

    promiseFlow.stack = [];

    for ( var i = 0; i < arguments.length; ++i) {
        promiseFlow.use(arguments[i]);
    }

    return promiseFlow;
};

function use(layer) {
    this.stack.push(layer);
    return this;
};

function handle(result) {
    var def = deferred();

    // TODO
    result = result || true;

    try {
        var promise = deferred(result);
        // TODO: ways to break out.
        this.stack.forEach(function(layer) {
            promise = promise.then(layer);
        });
        promise.then(def.resolve, def.resolve);
    } catch (e) {
        def.resolve(e);
    }

    return def.promise;
};

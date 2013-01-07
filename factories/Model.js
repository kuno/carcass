var debug = require('debug')('carcass:Factory:Model');

var carcass = require('carcass');
var _ = require('underscore');

// .
var createModel = require('../lib/model');

// Model
// ---
// Abstract factory; returns a concrete factory.

// .
module.exports = function(args) {
    debug('building');

    args = args || {};

    // Also support only an initialize function as the argument.
    if (typeof args === 'function') {
        args = {
            initialize: args
        };
    }

    // TODO: expose this somewhere?
    var Model = createModel(args.title || _.uniqueId('model_'));

    // Add attributes to the constructor.
    _.each(args.attributes || args.attrs || null, function(attr, key) {
        Model.attr(key, attr);
    });

    // Invoke the initialize function.
    if (args.initialize) {
        args.initialize(Model, args);
    }

    // The concrete factory.
    function builder(attrs, options) {
        attrs = attrs || {};

        // Merge options from builder and factory.
        options = _.extend(_.omit(args, 'initialize'), options);

        var model = new Model(attrs);

        // Invoke the bootstrap function.
        if (options.bootstrap) {
            options.bootstrap(model, options);
        }

        return model;
    };

    return builder;
};

var express = require('express');

module.exports = function(app) {
    var router = express.Router();

    // TODO: router seems like overkill for one route
    router.route('/')
        .get(function(req, res) {
            res.render('./pages/index', {});
        });

    app.use(router);

    /**
     * error logging
     * - catch 404 and forward to error handler
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    /**
     * error handling
     * development mode will print stacktrace
     */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('./pages/error', {
            message: err.message,
            error: err || {}
        });
    });
};
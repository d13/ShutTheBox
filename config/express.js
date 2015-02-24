var appConfig = require('./app');

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig = require('swig');

module.exports = function(app) {

    app.engine('swig', swig.renderFile);
    app.set('views', appConfig.paths.templates);
    app.set('view engine', 'swig');
    app.set('view cache', false);
    swig.setDefaults({ cache: false });

    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use(express.static(appConfig.paths.public));

    // swig base variables
    swig.setDefaults(appConfig.swigOpts);
};
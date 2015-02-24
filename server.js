var express = require('express');

// general site config
var appConfig = require('./config/app');

var app = express();

// express and swig setup
require('./config/express')(app);

// add routes and error handling
require('./app/routes')(app);

// start up
var server = app.listen(appConfig.port, function () {
    console.log('Express server listening on port ' + server.address().port);
});
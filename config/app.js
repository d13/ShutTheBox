var path = require('path');
var basePath = path.join(__dirname, '../');

var envMode = process.env.NODE_ENV || 'development';
var isDev = (envMode === 'development');

var appConfig = {
    port: process.env.VMC_APP_PORT || process.env.PORT || 3000,
    envMode: envMode,
    isDev: isDev,
    logLevel: isDev ? 'dev' : 'common',
    paths: {
        templates: path.join(basePath, '/app/templates'),
        public: path.join(basePath, '/public'),
        styles: {
            input: path.join(basePath,  '/public/styles/scss'),
            output: path.join(basePath, '/public/styles/css')
        },
        scripts: {
            input: path.join(basePath,  '/public/scripts/app'),
            output: path.join(basePath, '/public/scripts/app-build')
        }
    }
};

// swig base variables
appConfig.swigOpts = {
    locals: {
        now: function () {
            return new Date();
        },
        devMode: isDev,
        envMode: envMode
    }
};

module.exports = appConfig;
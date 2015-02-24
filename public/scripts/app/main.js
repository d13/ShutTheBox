require.config({
    baseUrl: '/scripts/app',
    paths: {
        'backbone':   '../libs/backbone/backbone-1.1.2',
        'handlebars': '../libs/handlebars/handlebars-v3.0.0',
        'jquery':     ['//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min', '../libs/jQuery/jquery-1.11.2'],
        'marionette': '../libs/marionette/marionette-2.3.2',
        'modernizr':  '../libs/modernizr/modernizr-2.8.3',
        'text':       '../libs/require/text',
        'underscore': '../libs/lodash/lodash.custom'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'modernizr': {
            exports: 'Modernizr'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['util/modernizr','app', 'modules/templateManager', 'modules/main'], function (Mzr, App) {
    App.start();
});


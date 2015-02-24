define(['backbone', 'marionette'], function(Backbone, Marionette){
    var App = new Marionette.Application();

    App.addRegions({
        mainRegion: 'body'
    });

    App.on("start", function(options){
        if (Backbone.history){
            Backbone.history.start();
        }
    });

    return window.App = App;
});
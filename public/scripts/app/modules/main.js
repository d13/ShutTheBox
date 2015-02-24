define(
    [
        'underscore','app', 'views/appView'
    ],
    function(_, App, AppView) {

        var MainModule = App.module('main', function(Main, MyApp, Backbone, Marionette, $, _) {
            this.listenTo(MyApp, 'start', function() {
                Main.start();
            });

            var appView = new AppView();
            App.getRegion('mainRegion').show(appView);

        });

        return MainModule;
    }
);
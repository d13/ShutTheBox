define(
    [
        'app', 'handlebars',
        'text!templates/appMain.html',
        'text!templates/game.html',
        'text!templates/boxSection.html',
        'text!templates/diceSection.html',
        'text!templates/playerSection.html',
        'text!templates/boxItem.html',
        'text!templates/player.html',
        'text!templates/die.html'
    ],
    function(App, hbs, tmplAppMain, tmplGame, tmplBoxSection, tmplDiceSection, tmplPlayerSection, tmplBoxItem, tmplPlayer, tmplDie) {


        var TemplateManagerModule = App.module('templateManager', {
            startWithParent: false,
            define: function(TemplateManager, MyApp, Backbone, Marionette, $, _) {

                var templates = {
                    //'view': {
                    //    raw: '',
                    //    template: function() {}
                    //},
                    appMain: {
                        raw: tmplAppMain
                    },
                    game: {
                        raw: tmplGame
                    },
                    boxSection: {
                        raw: tmplBoxSection
                    },
                    boxItem: {
                        raw: tmplBoxItem
                    },
                    diceSection: {
                        raw: tmplDiceSection
                    },
                    die: {
                        raw: tmplDie
                    },
                    playerSection: {
                        raw: tmplPlayerSection
                    },
                    player: {
                        raw: tmplPlayer
                    }
                };

                TemplateManager.compile = function (template) {
                    return hbs.compile(template);
                };
                TemplateManager.define = function (name, template) {
                    if (!name || !template || templates[name]) {
                        return;
                    }
                    templates[name] = {
                        raw: template
                    };
                };
                TemplateManager.get = function (name, callback) {
                    if (!name || !templates[name]) {
                        return;
                    }
                    var tpl = templates[name];

                    if (!tpl.template) {
                        tpl.template = this.compile(tpl.raw);
                    }

                    if (_.isFunction(callback)) {
                        callback(tpl.template);
                    }

                    return tpl.template;
                };
            }
        });

        return TemplateManagerModule;
    }
);
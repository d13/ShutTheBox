define(
    [
        'marionette','app','views/gameView'
    ],
    function(Marionette, App, GameView) {
        var AppView = Backbone.Marionette.LayoutView.extend({
            template: App.templateManager.get('appMain'),
            className: 'app-main',

            regions: {
                gameRegion: '[data-app-view-region="game"]'
            },
            events: {
                'click [data-app-view-action="newGame"]': 'onNewGame'
            },

            initialize: function() {
                this.listenTo(App.vent, 'game:completed', function(data) {
                    var messageList = ['--GAME OVER--'];
                    var winners = _.map(data.winners, function(model) { return model.get('name'); });

                    var winnersNamed = 'The winner is ';
                    if (winners.length > 1) {
                        messageList.push('We have a tie!');
                        winnersNamed = 'The winners are ';
                    }
                    messageList.push(winnersNamed + winners.join(' and '));

                    if (data.brokeBox) {
                        messageList.push('The Box has been Shut!');
                    } else {
                        messageList.push('With a score of: ' + data.score);
                    }
                    window.alert(messageList.join('\n'));
                    this.endGame();
                });
            },
            onBeforeDestroy: function() {
                this.endGame();
            },
            onNewGame: function() {
                if (this.gameSection && !window.confirm('Are you want to end this game?')) {
                    return;
                }
                this.endGame();
                this.startGame();
            },
            startGame: function() {
                this.gameSection = new GameView({
                    players: 2
                });
                this.getRegion('gameRegion').show(this.gameSection);
            },
            endGame: function() {
                if (this.gameSection) {
                    this.gameSection.destroy();
                    this.gameSection = null;
                }
            }

        });

        return AppView;
    }
);
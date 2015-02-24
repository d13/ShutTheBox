define(
    [
        'marionette','app',
        'views/playerSectionView', 'views/boxSectionView', 'views/diceSectionView'
    ],
    function(Marionette, App, PlayerSectionView, BoxSectionView, DiceSectionView) {
        // FIXME: this should have a GameView that you pass the game config to
        var GameView = Backbone.Marionette.LayoutView.extend({
            template: App.templateManager.get('game'),
            className: 'app-game',

            regions: {
                boxRegion:    '[data-game-view-region="box"]',
                diceRegion:   '[data-game-view-region="dice"]',
                playerRegion: '[data-game-view-region="player"]'
            },

            events: {
                'click [data-game-view-action="gameEnd"]': 'onForceEnd'
            },

            initialize: function(options) {
                this.playerSection = new PlayerSectionView({
                    players: 2
                });
                this.boxSection = new BoxSectionView();
                this.diceSection = new DiceSectionView();

                //this.listenTo(App.vent, 'game:turn:state:changed', function(data) {
                //    if (!data.remainingNumbers.length || (!data.isMatched && data.remainingNumbers.length && !data.validNumbers.length)) {
                //        App.vent.trigger('game:player:done', {
                //            score: data.remainingTotal,
                //            brokeBox: !data.remainingNumbers.length
                //        });
                //    }
                //});

                this.listenTo(App.vent, 'game:over', this.onGameOver);

                this.listenTo(App.vent, 'game:player:change', this.onGameChange);
            },
            onBeforeShow: function() {
                this.getRegion('playerRegion').show(this.playerSection);
                this.createGameControls();
            },
            onBeforeDestroy: function() {
                this.playerSection.destroy();
                this.playerSection = null;
                this.destroyGameControls();
            },
            onForceEnd: function() {
                App.vent.trigger('game:force:end');
            },
            onGameChange: function(data) {
                console.log('changing players', data);
                var messageList = [];
                messageList.push(data.previousPlayer.get('name')+' is finished');
                messageList.push('With a score of ' + data.previousPlayer.get('score'));
                window.alert(messageList.join('\n'));
                this.resetGameControls();

            },
            onGameOver: function(data) {
                console.log('game over', data);
                this.destroyGameControls();

                App.vent.trigger('game:completed', data);
            },
            createGameControls: function() {
                if(!this.boxSection) {
                    this.boxSection = new BoxSectionView();
                }
                this.getRegion('boxRegion').show(this.boxSection);

                if (!this.diceSection) {
                    this.diceSection = new DiceSectionView();
                }
                this.getRegion('diceRegion').show(this.diceSection);
            },
            destroyGameControls: function() {
                if (this.boxSection) {
                    this.boxSection.destroy();
                    this.boxSection = null;
                }
                if (this.diceSection) {
                    this.diceSection.destroy();
                    this.diceSection = null;
                }
            },
            resetGameControls: function() {
                this.destroyGameControls();
                this.createGameControls();
            }

        });

        return GameView;
    }
);
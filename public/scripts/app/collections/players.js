define(['app','backbone', 'models/player'], function(App, Backbone, PlayerModel) {
    var Players = Backbone.Collection.extend({
        model: PlayerModel,
        initialize: function() {
            this.listenTo(App.vent, 'game:player:done', this.onPlayerDone);
            this.listenTo(App.vent, 'game:force:end', this.onForceEnd);
        },
        onPlayerDone: function(data) {
            var activePlayerModel = this.getActivePlayer();
            activePlayerModel.set({
                score: data.score,
                active: false,
                done: true
            });
            if (!data.brokeBox) {
                var nextPlayer = this.getNextPlayer();
                if (nextPlayer) {
                    nextPlayer.set('active', true);
                    App.vent.trigger('game:player:change', {
                        previousPlayer: activePlayerModel,
                        player: nextPlayer
                    });
                } else {
                    var leadersByScore = this.getLeadersByScore();
                    App.vent.trigger('game:over', {
                        winners: leadersByScore.leaders,
                        score: leadersByScore.score,
                        brokeBox: false
                    });
                }
            } else {
                App.vent.trigger('game:over', {
                    winners: [activePlayerModel],
                    score: activePlayerModel.get('score'),
                    brokeBox: true
                });
            }
        },
        onForceEnd: function() {
            var leadersByScore = this.getLeadersByScore();
            App.vent.trigger('game:over', {
                winners: leadersByScore.leaders,
                score: leadersByScore.score,
                brokeBox: false
            });
        },
        getActivePlayer: function() {
            return this.findWhere({ active: true });
        },
        getNextPlayer: function() {
            return this.findWhere({ active: false, done: false });
        },
        getLeadersByScore: function() {
            var lowestScore = _.min(_.map(this.models, function(model) { return model.get('score'); }));

            var leaders = _.reject(this.models, function(model) { return model.get('score') !== lowestScore; });

            return {
                leaders: leaders,
                score: lowestScore
            }
        }
    });

    return Players;
});
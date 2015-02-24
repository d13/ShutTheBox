define(['app','marionette','collections/players','views/playerListView'], function(App, Marionette, Players, PlayerListView) {
    var PlayerSectionView = Marionette.LayoutView.extend({
        template: App.templateManager.get('playerSection'),
        regions: {
            scoreboardRegion: '.player-scoreboard'
        },
        initialize: function() {

            var playerListData = [];
            for (var i=1, l=2; i<=l; i++) {
                playerListData.push({
                    name: 'Player ' + i,
                    active: i === 1
                });
            }
            this.playersCollection = new Players(playerListData.slice());
            this.playerListView = new PlayerListView({
                collection: this.playersCollection
            });
        },
        onBeforeShow: function() {
            this.getRegion('scoreboardRegion').show(this.playerListView);
        },
        onBeforeDestroy: function() {
            this.playerListView.destroy();
            this.playerListView = null;
            this.playersCollection.unbind();
            this.playersCollection.stopListening();
            this.playersCollection.reset();
        }
    });

    return PlayerSectionView;
});
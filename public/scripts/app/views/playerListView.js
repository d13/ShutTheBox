define(['app','marionette', 'views/playerView'], function(App, Marionette, PlayerView) {
    var PlayerListView = Marionette.CollectionView.extend({
        childView: PlayerView,
        className: 'player-list',
        tagName: 'ul'
    });

    return PlayerListView;
});
define(['app','marionette', 'models/player'], function(App, Marionette, PlayerModel) {
    var BoxItemView = Marionette.ItemView.extend({
        model: PlayerModel,
        template: App.templateManager.get('player'),
        className: 'player-profile',
        tagName: 'li',

        modelEvents: {
            'change': 'onChange'
        },

        initialize: function() {
            //this.listenTo(this.model, 'change', this.onChange);
        },
        onChange: function(e) {
            this.updatePlayerView();
        },
        onRender: function(e) {
            this.updatePlayerView();
        },
        updatePlayerView: function() {
            this.$el.find('[data-view-region="score"]').html(this.model.get('score'));
            this.$el.toggleClass('is-active', this.model.get('active'));
            this.$el.toggleClass('is-done', this.model.get('done'));
        }
    });

    return BoxItemView;
});
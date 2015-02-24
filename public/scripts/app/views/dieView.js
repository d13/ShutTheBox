define(['app','marionette', 'models/die'], function(App, Marionette, DieModel) {
    var BoxItemView = Marionette.ItemView.extend({
        model: DieModel,
        template: App.templateManager.get('die'),
        tagName: 'li',
        className: 'dice-indicator',
        initialize: function() {
            var me = this;
            this.listenTo(this.model, 'change', function(){
                me.render();
            });
        },
        onRender: function() {
            var hasRolled = this.model.get('rolled');
            this.$el.toggleClass('dice-not-rolled', !hasRolled);
        }
    });

    return BoxItemView;
});
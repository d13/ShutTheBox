define(['app','marionette', 'models/boxItem'], function(App, Marionette, BoxItem) {
    var BoxItemView = Marionette.ItemView.extend({
        model: BoxItem,
        template: App.templateManager.get('boxItem'),
        className: 'box-number-item',
        events: {
            'click': 'onToggleNumber'
        },
        initialize: function() {
            var me = this;
            this.listenTo(this.model, 'change:mode', function() {
                var mode = me.model.get('mode');
                me.$el
                    .attr('data-number-state', mode)
                    .data('number-state', mode);
            });

        },
        onToggleNumber: function() {
            this.toggleMode();
        },
        toggleMode: function() {
            var mode = this.model.get('mode');
            if (mode === 'selected' || mode === 'default') {
                return;
            }
            var modeVal = (mode === 'pending') ? 'selectable' : 'pending';
            this.model.set('mode', modeVal);

            return modeVal;
        }
    });

    return BoxItemView;
});
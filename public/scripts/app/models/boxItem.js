define(['app','backbone'], function(App, Backbone) {
    var BoxItemModel = Backbone.Model.extend({
        defaults: function() {
            return {
                selected: false,
                mode: 'default'  // 'default', 'selectable', 'pending', 'selected'
            };
        }
    });

    return BoxItemModel;
});
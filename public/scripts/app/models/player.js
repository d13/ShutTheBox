define(['app','backbone'], function(App, Backbone) {
    var PlayerModel = Backbone.Model.extend({
        defaults: function() {
            return {
                score: 0,
                active: false,
                done: false
            };
        }
    });

    return PlayerModel;
});
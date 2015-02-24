define(['underscore','app','backbone'], function(_, App, Backbone) {

    var DieModel = Backbone.Model.extend({
        defaults: function() {
            return {
                value: 0,
                rolled: false
            };
        },
        roll: function() {
            var val = _.random(1, 6);
            this.set({
                value: val,
                rolled: true
            });
            return this.get('value');
        }
    });

    return DieModel;
});
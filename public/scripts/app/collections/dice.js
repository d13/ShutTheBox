define(['underscore','app','backbone', 'models/die'], function(_, App, Backbone, DieModel) {
    var DiceList = Backbone.Collection.extend({
        model: DieModel,
        initialize: function() {
            this.listenTo(App.vent, 'game:turn:end', this.onTurnEnd);
        },
        onTurnEnd: function() {
            _.each(this.models, function(model) {
                model.set({
                    value: 0,
                    rolled: false
                });
            });
        },
        roll: function(limit) {
            var dataLength = this.length;
            if (!limit || limit > dataLength) {
                limit = dataLength;
            }
            var results = [];
            _.each(this.models, function(model, i) {
                if (i < limit) {
                    var val = model.roll();
                    results.push(val);
                } else {
                    model.set({
                        value: 0,
                        rolled: false
                    });
                }
            });

            return results;
        },
        getTotal: function() {
            var modelValues = _(this).map(function(model) {
                return model.get('value');
            });

            return (_.reduce(modelValues, function(sum, n) {
                    return sum + n;
                })) || 0;
        }
    });

    return DiceList;
});
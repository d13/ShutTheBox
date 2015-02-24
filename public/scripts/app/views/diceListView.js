define(['app','marionette', 'views/dieView'], function(App, Marionette, DieView) {
    var DiceListView = Marionette.CollectionView.extend({
        childView: DieView,
        tagName: 'ul',
        className: 'dice-list',
        initialize: function() {

        },
        roll: function(limit) {
            var diceVals = this.collection.roll(limit);
            var total = 0;
            _.each(diceVals, function(val) {
                total += val;
            });

            var result = { values: diceVals, total: total };

            App.vent.trigger('game:dice:rolled', result);
        }
    });

    return DiceListView;
});
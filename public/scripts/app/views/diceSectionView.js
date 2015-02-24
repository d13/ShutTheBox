define(['underscore','app','marionette','collections/dice', 'views/diceListView'], function(_, App, Marionette, DiceItems, DiceListView) {
    var DiceSectionView = Marionette.LayoutView.extend({
        template: App.templateManager.get('diceSection'),
        regions: {
            diceListRegion: '.dice-summary'
        },
        events: {
            'click [data-view-action="throwSingle"]': 'onRollSingle',
            'click [data-view-action="throwBoth"]': 'onRollBoth'
        },
        initialize: function() {
            var diceItemData = [];
            for (var i=1, l=2; i<=l; i++) {
                diceItemData.push({ value: 0 });
            }
            this.diceItemsCollection = new DiceItems(diceItemData.slice());
            this.diceListView = new DiceListView({
                collection: this.diceItemsCollection
            });

            this.diceRolled = false;
            var me = this;
            this.listenTo(App.vent, 'game:dice:rolled', function(data) {
                this.diceRolled = true;
                me.displaySum(data);
                me.blockView();
            });

            this.listenTo(App.vent, 'game:turn:end', function() {
                this.diceRolled = false;
                me.displaySum({ total: 0 });
                me.unblockView();
            });

            this.listenTo(App.vent, 'game:turn:state:changed', function(data) {
                var bigNumbers = _.reject(data.remainingNumbers, function(num) {
                    return num < 7;
                });
                if (bigNumbers.length) {
                    me.blockSingle();
                } else {
                    me.unblockSingle();
                }
            });

            //this.listenTo(App.vent, 'game:player:change', function(data) {
            //    diceItems.reset(diceItemData.slice());
            //    this.diceRolled = false;
            //    me.displaySum({ total: 0 });
            //    me.blockSingle();
            //    me.unblockView();
            //});
        },
        onBeforeShow: function() {
            this.getRegion('diceListRegion').show(this.diceListView);
            this.blockSingle();
        },
        onBeforeDestroy: function() {
            this.diceListView.destroy();
            this.diceItemsCollection.unbind();
            this.diceItemsCollection.stopListening();
            this.diceItemsCollection.reset();
        },
        onRollSingle: function() {
            if (this.diceRolled) {
                return;
            }
            this.diceListView.roll(1);
        },
        onRollBoth: function() {
            if (this.diceRolled) {
                return;
            }
            this.diceListView.roll();
        },
        displaySum: function(data) {
            data || (data = this.diceListView.collection.getTotal());
            this.$el.find('[data-view-subregion="sum"]').html(data.total);
        },
        blockView: function() {
            this.$el.find('[data-view-subregion="controls"]').addClass('is-blocked');
        },
        unblockView: function() {
            this.$el.find('[data-view-subregion="controls"]').removeClass('is-blocked');
        },
        blockSingle: function() {
            this.$el.find('[data-view-action="throwSingle"], .dice-separator').addClass('hide');
        },
        unblockSingle: function() {
            this.$el.find('[data-view-action="throwSingle"], .dice-separator').removeClass('hide');
        }
    });

    return DiceSectionView;
});
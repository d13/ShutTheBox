define(['underscore','app','marionette','collections/boxItems','views/boxItemListView'], function(_, App, Marionette, BoxItems, BoxItemListView) {
    var BoxSectionView = Marionette.LayoutView.extend({
        template: App.templateManager.get('boxSection'),
        regions: {
            boxListRegion: '.box-number-list'
        },
        events: {
            'click [data-view-action="endTurn"]': 'onEndTurn'
        },
        initialize: function() {
            this.blockTurn();
            var boxItemsData = [];
            for (var i=1, l=9; i<=l; i++) {
                boxItemsData.push({ name: i, value: i });
            }
            this.boxItemsCollection = new BoxItems(boxItemsData.slice());
            this.boxItemListView = new BoxItemListView({
                collection: this.boxItemsCollection
            });

            this.scoreToMatch = 0;
            this.turnCount = 1;

            var me = this;
            this.listenTo(App.vent, 'game:dice:rolled', function(data) {
                me.scoreToMatch = data.total;
                this.blockTurn();
            });
            this.listenTo(App.vent, 'game:turn:state:changed', function(data) {
                if (data.isMatched) {
                    me.unblockTurn();
                } else {
                    me.blockTurn();
                }
            });

            //this.listenTo(App.vent, 'game:player:change', function(data) {
            //    this.scoreToMatch = 0;
            //    this.turnCount = 1;
            //    this.blockTurn();
            //    boxItems.reset(boxItemsData.slice());
            //});
        },
        onBeforeShow: function() {
            this.getRegion('boxListRegion').show(this.boxItemListView);
            this.blockTurn();
        },
        onBeforeDestroy: function() {
            this.boxItemListView.destroy();
            this.boxItemsCollection.unbind();
            this.boxItemsCollection.stopListening();
            this.boxItemsCollection.reset();
        },
        onEndTurn: function(e) {
            e.preventDefault();
            this.endTurn();
        },
        endTurn: function() {
            if (!this.canChangeTurn) {
                return;
            }
            this.blockTurn();

            this.turnCount++;
            this.getTurnBtn().html('End Turn ' + this.turnCount);

            var data = {};
            App.vent.trigger('game:turn:end', data);
        },
        getTurnBtn: function() {
            if (!this.$turnBtnEl || !this.$turnBtnEl.length) {
                this.$turnBtnEl = this.$el.find('[data-view-action="endTurn"]');
            }
            return this.$turnBtnEl;
        },
        blockTurn: function() {
            this.canChangeTurn = false;
            this.getTurnBtn().addClass('is-blocked');
        },
        unblockTurn: function() {
            this.canChangeTurn = true;
            this.getTurnBtn().removeClass('is-blocked');
        }
    });

    return BoxSectionView;
});
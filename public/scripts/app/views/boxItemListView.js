define(['app','marionette', 'views/boxItemView'], function(App, Marionette, BoxItemView) {
    var BoxItemListView = Marionette.CollectionView.extend({
        childView: BoxItemView
    });

    return BoxItemListView;
});
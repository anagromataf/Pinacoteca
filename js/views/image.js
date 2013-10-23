
App.ImagesView = Ember.CollectionView.extend({
    tagName: 'div',
    itemViewClass: 'App.ImageView'
});

App.ImageView = Ember.View.extend({
  templateName: "image"
});

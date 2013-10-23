
App.ImagesView = Ember.CollectionView.extend({
    tagName: 'div',
    itemViewClass: 'App.ImageView',
    
    childViewsDidChange: function(views, start, removed, the) {
      this.get('childViews').forEach(function(view) {
        view.set('width', 100);
        view.set('height', 100);
      });
    }
});

App.ImageView = Ember.View.extend({
  templateName: "image",
  
  classNames: ['image'],
  
  width: 0,
  height: 0,
  
  propertyDidChange: function (name) {
    if (name == 'width' || name == 'height') {
      this.$().css(name, this.get(name));
    }
  },
  
  didInsertElement: function(){
    this.$().css('width', this.get('width'));
    this.$().css('height', this.get('height'));
    this.$().css('background-image', 'url(' + this.content.get('url') + ')');
  }
});

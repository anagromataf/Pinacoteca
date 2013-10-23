
App.ImagesView = Ember.CollectionView.extend({
    tagName: 'div',
    itemViewClass: 'App.ImageView',
    
    childViewsDidChange: function(views, start, removed, the) {
      this.updateGrid();
    },
    
    didInsertElement: function(){
      var collection = this;
      $(window).resize(function(){
        collection.updateGrid();
      });
      collection.updateGrid();
    },
    
    updateGrid: function() {
      var collection = this.$();
      if (collection) {
        var collectionWidth = this.$().width();
        var views = this.get('childViews');
        for (var i = 0; i < views.length; i++) {
          var view = views[i];
          
          var aspectRatio = view.content.get('aspectRatio');
          var width = collectionWidth;
          var height = collectionWidth / aspectRatio;
          
          view.set('width', width);
          view.set('height', height);
        }
      }
    }
});


App.ImageView = Ember.View.extend({
  templateName: "image",
  
  classNames: ['image'],
  
  width: 0,
  height: 0,
  
  widthObserver: function() {
      this.$().css('width', this.get('width'));
  }.observes('width'),
  
  heightObserver: function() {
      this.$().css('height', this.get('height'));
  }.observes('height'),
  
  didInsertElement: function(){
    this.$().css('width', this.get('width'));
    this.$().css('height', this.get('height'));
    this.$().css('background-image', 'url(' + this.content.get('url') + ')');
  }
});



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
      if (this.$()) {
        
        var collectionWidth = this.$().width();
        
        var currentRow = new Array();
        
        var views = this.get('childViews');
        for (var i = 0; i < views.length; i++) {
          var view = views[i];
          
          currentRow.push(view);
          
          var rowAspectRatio = 0;
          for (var x = 0; x < currentRow.length; x++) {
            rowAspectRatio += currentRow[x].content.get('aspectRatio');
          }
          
          var rowHeight = collectionWidth / rowAspectRatio;
          if (rowHeight < 200) {
            
             for (var z = 0; z < currentRow.length; z++) {
               var aspectRatio = currentRow[z].content.get('aspectRatio');
               
               var width = aspectRatio * collectionWidth / rowAspectRatio;
               var height = width / aspectRatio;
               
               currentRow[z].set('width', width);
               currentRow[z].set('height', height);
             }
             
             currentRow = new Array();
          }
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
    this.$().css('background-image', 'url(' + this.content.get('url') + ')');
  }
});


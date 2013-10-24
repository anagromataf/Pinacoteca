
App.ImagesView = Ember.CollectionView.extend({
    tagName: 'div',
    itemViewClass: 'App.ImageView',
    
    childViewsDidChange: function(views, start, removed, the) {
      this.updateGrid();
    },
    
    didInsertElement: function(){
      this.$().css('position', 'relative');
      
      var collection = this;
      $(window).resize(function(){
        collection.updateGrid();
      });
      collection.updateGrid();
    },
    
    updateGrid: function() {
      if (this.$()) {
        
        var collectionWidth = this.$().width();
        
        var offsetY = 0;
        
        var currentRow = new Array();
        
        aspectRatioOfRow = function (currentRow) {
          var rowAspectRatio = 0;
          for (var x = 0; x < currentRow.length; x++) {
            rowAspectRatio += currentRow[x].content.get('aspectRatio');
          }
          return rowAspectRatio;
        };
        
        flushRow = function (rowAspectRatio) {
          var rowHeight = collectionWidth / rowAspectRatio;
          
          var offsetX = 0;
          
          for (var z = 0; z < currentRow.length; z++) {   
             
             var aspectRatio = currentRow[z].content.get('aspectRatio');
             
             var width = aspectRatio * collectionWidth / rowAspectRatio;
             var height = width / aspectRatio;
           
             currentRow[z].set('width', width);
             currentRow[z].set('height', height);
             
             currentRow[z].set('offsetX', offsetX);
             currentRow[z].set('offsetY', offsetY);
             
             offsetX += width;
           }
           
           currentRow = new Array();
           
           offsetY += rowHeight;
        };
        
        var views = this.get('childViews');
        for (var i = 0; i < views.length; i++) {
          var view = views[i];
          
          if (currentRow.length > 0) {            
            var rowAspectRatio = aspectRatioOfRow(currentRow);
            if (collectionWidth / (rowAspectRatio + view.content.get('aspectRatio')) < 180) {
              flushRow(rowAspectRatio);
            }
          }
          currentRow.push(view);
        }
        
        if (currentRow.length > 0) {
          var rowAspectRatio = aspectRatioOfRow(currentRow);
          flushRow(rowAspectRatio);
        }
      }
    }
});

App.ImageView = Ember.View.extend({
  templateName: "image",
  
  classNames: ['image'],
  
  width: 0,
  height: 0,
  offsetX: 0,
  offsetY: 0,
  
  widthObserver: function() {
    this.$().css('width', this.get('width'));
  }.observes('width'),
  
  heightObserver: function() {
    this.$().css('height', this.get('height'));
  }.observes('height'),
  
  offsetXObserver: function () {
    this.$().css('left', this.get('offsetX'));
  }.observes('offsetX'),
  
  offsetYObserver: function () {
    this.$().css('top', this.get('offsetY'));
  }.observes('offsetY'),
  
  didInsertElement: function(){
    this.$().css('position', 'absolute');
    this.$().css('background-image', 'url(' + this.content.get('url') + ')');
  }
});


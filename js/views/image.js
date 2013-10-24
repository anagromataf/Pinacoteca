App.ImagesView = Ember.CollectionView.extend({
  tagName: 'div',
  itemViewClass: 'App.ImageView',

  margin: 10,
  maxAspectRatio: 2.5,
  
  childViewsDidChange: function(views, start, removed, the) {
    this.updateGrid();
  },

  didInsertElement: function() {
    this.$().css('position', 'relative');

    var collection = this;
    $(window).resize(function() {
      collection.updateGrid();
    });
    collection.updateGrid();
  },

  updateGrid: function() {
    if (this.$()) {

      var margin = this.get('margin');
      var maxAspectRatio = this.get('maxAspectRatio');
      var minAspectRatio = 1 / maxAspectRatio;
      
      var collectionWidth = this.$().width();
      
      var currentRow = new Array();
      var offsetY = margin;
      
      aspectRatioOfRow = function(currentRow) {
        var rowAspectRatio = 0;
        for (var x = 0; x < currentRow.length; x++) {
          rowAspectRatio += Math.max(minAspectRatio, Math.min(maxAspectRatio, currentRow[x].content.get('aspectRatio')));
        }
        return rowAspectRatio;
      };
      
      flushRow = function(rowAspectRatio) {
        
        var _collectionWidth = collectionWidth;
        var rowHeight = Math.round(_collectionWidth / rowAspectRatio);
        var offsetX = margin;
        
        for (var z = 0; z < currentRow.length; z++) {
          var width = 0;
          if (z == currentRow.length - 1) {
            width = _collectionWidth - offsetX;
          } else {
            var aspectRatio = Math.max(minAspectRatio, Math.min(maxAspectRatio, currentRow[z].content.get('aspectRatio')));
            width = Math.round(aspectRatio * (_collectionWidth - margin) / rowAspectRatio);
          }
          width -= margin;
          
          currentRow[z].set('width', width);
          currentRow[z].set('height', rowHeight);
          currentRow[z].set('offsetX', offsetX);
          currentRow[z].set('offsetY', offsetY);

          offsetX += width + margin;
        }

        currentRow = new Array();
        offsetY += rowHeight + margin;
      };

      var views = this.get('childViews');
      for (var i = 0; i < views.length; i++) {
        var view = views[i];

        if (currentRow.length > 0) {
          var rowAspectRatio = aspectRatioOfRow(currentRow);
          if (collectionWidth / (rowAspectRatio + Math.max(minAspectRatio, Math.min(maxAspectRatio, view.content.get('aspectRatio')))) < 180) {
            flushRow(rowAspectRatio);
          }
        }
        currentRow.push(view);
      }

      if (currentRow.length > 0) {
        var rowAspectRatio = aspectRatioOfRow(currentRow);
        flushRow(rowAspectRatio);
      }

      this.$().css('height', offsetY);
    }
  }.observes('maxAspectRatio').observes('margin')
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

  offsetXObserver: function() {
    this.$().css('left', this.get('offsetX'));
  }.observes('offsetX'),

  offsetYObserver: function() {
    this.$().css('top', this.get('offsetY'));
  }.observes('offsetY'),

  didInsertElement: function() {
    this.$().css('position', 'absolute');
    this.$().css('background-image', 'url(' + this.content.get('url') + ')');
  }
});

Pinacoteca = Ember.Namespace.create({});
Pinacoteca.Model = Ember.Namespace.create({});
Pinacoteca.View = Ember.Namespace.create({});

// --------------------------
// Model
// --------------------------

// Item

Pinacoteca.Model.Item = Ember.Object.extend({
  mimeType: null,
  created: null,
  url: null,
  backgroundImage: function() {
    return undefined;
  }
});

Pinacoteca.Model.Item.reopenClass({
  all: function() {
    return Pinacoteca.Model.Item.DATA;
  }
});

// Mix Ins

Pinacoteca.Model.Viewable = Ember.Mixin.create({
  width: null,
  height: null,
  aspectRatio: function() {
    return this.get('width') / this.get('height');
  }.property('width', 'height')
});

Pinacoteca.Model.Playable = Ember.Mixin.create({
  duration: null
});

// Image

Pinacoteca.Model.Image = Pinacoteca.Model.Item.extend(Pinacoteca.Model.Viewable, {
  backgroundImage: function() {
    return this.get('url');
  }.property('url')
});

// Audio

Pinacoteca.Model.Audio = Pinacoteca.Model.Item.extend(Pinacoteca.Model.Playable, {
});

// Video

Pinacoteca.Model.Video = Pinacoteca.Model.Item.extend(Pinacoteca.Model.Viewable, Pinacoteca.Model.Playable, {
});

// --------------------------
// Views
// --------------------------

// Collection

Pinacoteca.View.Items = Ember.CollectionView.extend({
  classNames: ['pinacoteca'],

  tagName: 'div',
  itemViewClass: 'Pinacoteca.View.Item',

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

  createChildView: function(viewClass, attrs) {
    if (attrs.content.get('mimeType') == 'image/jpeg') {
      viewClass = Pinacoteca.View.Image;
    } else if (attrs.content.get('mimeType') == 'audio/mp3') {
      viewClass = Pinacoteca.View.Audio;
    } else if (attrs.content.get('mimeType') == 'video/mp4') {
      viewClass = Pinacoteca.View.Video;
    }
    return this._super(viewClass, attrs);
  },

  updateGrid: function() {
    if (this.$()) {

      var margin = this.get('margin');
      var maxAspectRatio = this.get('maxAspectRatio');
      var minAspectRatio = 1 / maxAspectRatio;

      var collectionWidth = this.$().width();

      var currentRow = new Array();
      var offsetY = margin;

      aspectRatioOfView = function (view) {
        var ar =  view.content.get('aspectRatio')
        if (ar == undefined) {
          return 1;
        } else {
          return Math.max(minAspectRatio, Math.min(maxAspectRatio, ar));;
        }
      };
      
      aspectRatioOfRow = function(currentRow) {
        var rowAspectRatio = 0;
        for (var x = 0; x < currentRow.length; x++) {
          rowAspectRatio += aspectRatioOfView(currentRow[x]);
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
            var aspectRatio = aspectRatioOfView(currentRow[z]);
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
          if (collectionWidth / (rowAspectRatio + aspectRatioOfView(view)) < 180) {
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

// Items

Pinacoteca.View.Item = Ember.View.extend({
  classNames: ['pinacoteca', 'item'],

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
    backgroundImage = this.content.get('backgroundImage');
    if (backgroundImage) {
      this.$().css('background-image', 'url(' + backgroundImage + ')');
    } else {
      this.$().css('background-image', 'none');
    }
  }
});

Pinacoteca.View.Image = Pinacoteca.View.Item.extend({
  classNames: ['pinacoteca', 'image'],
});

Pinacoteca.View.Audio = Pinacoteca.View.Item.extend({
    classNames: ['pinacoteca', 'audio']
});

Pinacoteca.View.Video = Pinacoteca.View.Item.extend({
    classNames: ['pinacoteca', 'video']
});

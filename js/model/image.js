App.Image = App.Item.extend({
  
  width: null,
  height: null,
  url: "images/default.jpg",
  
  aspectRatio: function() {
    return this.get('width') / this.get('height');     
  }.property('width', 'height')
  
});

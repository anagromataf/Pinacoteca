App.Image = Ember.Object.extend({
  
  width: null,
  height: null,
  url: "images/default.jpg",
  
  aspectRatio: function() {
    return this.get('width') / this.get('height');     
  }.property('width', 'height')
  
});

App.Image.FIXTURE = [
  App.Image.create({ width: 1024, height: 768, url: "img-01.jpg" }),
  App.Image.create({ width: 1280, height: 276, url: "img-02.jpg" }),
  App.Image.create({ width: 1280, height: 857, url: "img-03.jpg" }),
  App.Image.create({ width: 1280, height: 960, url: "img-04.jpg" }),
  App.Image.create({ width: 1280, height: 344, url: "img-06.jpg" }),
  App.Image.create({ width: 960, height: 1280, url: "img-07.jpg" }),
  App.Image.create({ width: 1280, height: 960, url: "img-08.jpg" }),
  App.Image.create({ width: 960, height: 1280, url: "img-09.jpg" }),
  App.Image.create({ width: 1280, height: 857, url: "img-10.jpg" }),
  App.Image.create({ width: 1280, height: 857, url: "img-11.jpg" }),
  App.Image.create({ width: 1280, height: 857, url: "img-12.jpg" }),
  App.Image.create({ width: 1280, height: 857, url: "img-13.jpg" }),
  App.Image.create({ width: 1280, height: 960, url: "img-14.jpg" }),
  App.Image.create({ width: 1280, height: 960, url: "img-15.jpg" }),
  App.Image.create({ width: 1280, height: 960, url: "img-16.jpg" })
];

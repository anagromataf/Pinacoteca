App.Router.map(function () {
  this.resource('images', { path: '/' });
});

App.ImagesRoute = Ember.Route.extend({
  model: function () {
    return App.Image.FIXTURE;
  }
});

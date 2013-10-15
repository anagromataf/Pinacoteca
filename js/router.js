App.Router.map(function () {
  this.resource('stream', { path: '/' });
});

App.StreamRoute = Ember.Route.extend({
  model: function () {
    return App.Item.all();
  }
});

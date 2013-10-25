App.Router.map(function () {
  this.resource('stream', { path: '/' });
});

App.StreamRoute = Ember.Route.extend({
  model: function () {
    return Pinacoteca.Model.Item.all();
  }
});

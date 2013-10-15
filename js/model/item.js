
// Model
// -----

App.Item = Ember.Object.extend({
  mimeType: null,
  created: null
});

// Accessors
// ---------

App.Item.reopenClass({  
  all: function () {
    return App.Item.DATA;
  }
});

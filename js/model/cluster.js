
// Model
// -----

App.Cluster = Ember.Object.extend({
  name: null
});

// Accessors
// ---------

App.Cluster.reopenClass({  
  
  clusters: function () {
    return [];
  },
  
  items: function () {
    return [];
  }
});

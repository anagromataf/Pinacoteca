
App.ImagesController = Ember.ArrayController.extend({
    needs: ['category'],
    contentBinding: 'controllers.contents',
    itemController: 'image'
});

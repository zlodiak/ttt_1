window.APP = window.APP || {};

APP.CellModel = Backbone.Model.extend({

  defaults: {
    xCoord: undefined,
    yCoord: undefined,
    mark: 0,
  }        

});


APP.FieldModel = Backbone.Model.extend({

  defaults: {

  }        

});


APP.PlayerModel = Backbone.Model.extend({
  
  defaults: {
    score: 0,
    mark: 1
  }        

});


APP.CompPlayerModel = Backbone.Model.extend({
  
  defaults: {
    score: 0,
    mark: -1
  }        

});


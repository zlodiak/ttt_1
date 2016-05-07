APP.TttView = Backbone.View.extend({  

  initialize: function() {   
    //this.ttt = new APP.PlayerModel();
    //this.ttt = new APP.CompPlayerModel();
    this.ttt = new APP.FieldModel();

    this.render();
  },    

  template: _.template($('#tttTpl').html()),

  render: function () {    
    this.$el.html(this.template());  
    return this;
  }

});



APP.TttView = Backbone.View.extend({  

  initialize: function() {   
    //this.ttt = new APP.PlayerModel();
    //this.ttt = new APP.CompPlayerModel();
    this.fieldView = new APP.FieldView();

    this.render();
  },    

  template: _.template($('#tttTpl').html()),

  render: function () {    
    this.$el.html(this.template());  
    return this;
  }

});


APP.FieldView = Backbone.View.extend({  

  initialize: function() {   
    this.cellArr = [];

    for(var y = 0; y < 3; y++) {
      this.cellArr[y] = [];

      for(var x = 0; x < 3; x++) {
        this.cellArr[y][x] = new APP.CellModel({
          xCoord: x,
          yCoord: y
        });
      };
    };

    console.dir(this.cellArr);
  }//,    

/*  template: _.template($('#fieldTpl').html()),

  render: function () {    
    this.$el.html(this.template());  
    return this;
  }*/

});



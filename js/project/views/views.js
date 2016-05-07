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
    this.$el.find('#fieldContainer').html(this.fieldView.render().el);  
    return this;
  }

});


APP.FieldView = Backbone.View.extend({  

  className: 'field',

  id: 'field',

  initialize: function() {   
    this.cellsViewsArr = [];

    for(var y = 0; y < 3; y++) {
      this.cellsViewsArr[y] = [];

      for(var x = 0; x < 3; x++) {
        var cellModel = new APP.CellModel({
          xCoord: x,
          yCoord: y
        });

        this.cellsViewsArr[y][x] = new APP.CellView({model: cellModel});
      };
    };
  },    

  render: function () {    
    this.renderCells();
    return this;
  },

  renderCells: function () {    
    for(var y = 0; y < 3; y++) {
      for(var x = 0; x < 3; x++) {
        var cellElem = this.cellsViewsArr[y][x].render().el;
        this.$el.append(cellElem);
      };
    };

    return this;
  }  

});


APP.CellView = Backbone.View.extend({  

  initialize: function() {   

  }, 

  className: 'cell',   

  template: _.template($('#cellTpl').html()),

  render: function () {    
    this.$el.html(this.template());  
    return this;
  }

});



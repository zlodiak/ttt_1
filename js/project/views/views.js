APP.TttView = Backbone.View.extend({  

  initialize: function() {   
    this.fieldView = new APP.FieldView();

    this.stepsCollection = [];
    this.stepNum = 0;    

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
    this.cellCollection = new APP.CellCollection();
    this.cellsViewsArr = [];

    for(var y = 0; y < 3; y++) {
      this.cellsViewsArr[y] = [];

      for(var x = 0; x < 3; x++) {
        var cellModel = new APP.CellModel({
          xCoord: x,
          yCoord: y
        });

        this.cellsViewsArr[y][x] = new APP.CellView({model: cellModel});
        this.cellCollection.add(cellModel);
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

  className: 'cell',   

  render: function () {    
    this.$el.addClass(this._markDefine());
    this.$el.attr('data-x-coord', this.model.get('xCoord'));
    this.$el.attr('data-y-coord', this.model.get('yCoord'));
    this.$el.html();  

    return this;
  },

  _markDefine: function () {    
    var cellMark;

    if(this.model.get('mark') == -1) {
      cellMark = 'zero_mark';
    } else if(this.model.get('mark') == 1) {
      cellMark = 'cross_mark';
    };

    return cellMark;
  }

});



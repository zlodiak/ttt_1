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
  },

  compStep: function () { 
    var emptyCells = this.fieldView.cellCollection.where({mark: 0});

    console.log(emptyCells);
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

  initialize: function() {   
    this.listenTo(this.model, 'change', this.nextStep);
  }, 

  className: 'cell',   

  // template: _.template($('#cellTpl').html()),

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
  },

  events:{
    'click' : 'clickHandler'
  },    

  clickHandler: function(event) { 
    var xCoord = this.model.get('xCoord'),
        yCoord = this.model.get('yCoord'),
        mark = this.model.get('mark');

    console.log(xCoord, yCoord);

    if(mark == 0) {
      this.model.set({mark: 1});
      console.log(this.model);
    } else {
      console.log('err')
    };
  },

  nextStep: function(event) { 
    this.render();
    app.compStep();
  }  

});



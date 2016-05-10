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
  },  

  events:{
    'click' : 'clickHandler'
  },    

  clickHandler: function(event) { 
    event = event || window.event;

    var cellElem = event.target || event.srcElement,
        idModel = parseInt($(cellElem).attr('data-id-model')),
        cellModel = this.fieldView.cellCollection.where({idModel: idModel})[0],
        cellXcoord = cellModel.get('xCoord'),
        cellYcoord = cellModel.get('yCoord'),
        cellMark = cellModel.get('mark'),
        cellView = this.fieldView.cellsViewsArr[cellYcoord][cellXcoord];

    if(cellMark == 0) {
      cellModel.set({mark: 1});
      cellView.render();

      this.addStep(1, cellXcoord, cellYcoord);

      this.compStep();
    } else {
      console.log('err')
    };
  },

  compStep: function() {  
    var emptyCells = this.fieldView.cellCollection.where({mark: 0});

    if(emptyCells.length == 0) { return };

    var randCell = APP.helper.randomIntFromZero(emptyCells.length),
        emptyCellModel = emptyCells[randCell],
        emptyCellXcoord = emptyCellModel.get('xCoord'),
        emptyCellYcoord = emptyCellModel.get('yCoord'),
        emptyCellView = this.fieldView.cellsViewsArr[emptyCellYcoord][emptyCellXcoord];

    this.addStep(-1, emptyCellXcoord, emptyCellYcoord);

    emptyCellModel.set({mark: -1});
    emptyCellView.render();
       
  },

  addStep: function(playerMark, xCoord, yCoord) {  
    this.stepsCollection.push({
      num: this.stepNum++,
      xCoord: xCoord,
      yCoord: yCoord,
      mark: playerMark,
    }); 
  }

});


APP.FieldView = Backbone.View.extend({  

  className: 'field',

  id: 'field',

  initialize: function() {
    var idModel = 0;

    this.cellCollection = new APP.CellCollection();
    this.cellsViewsArr = [];

    for(var y = 0; y < 3; y++) {
      this.cellsViewsArr[y] = [];

      for(var x = 0; x < 3; x++) {
        var cellModel = new APP.CellModel({
          xCoord: x,
          yCoord: y,
          idModel: idModel
        });

        idModel++;

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
    this.$el.attr('data-id-model', this.model.get('idModel'));
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



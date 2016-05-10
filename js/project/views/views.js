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
    'click' : 'playerStep'
  },    

  playerStep: function(event) { 
    event = event || window.event;

    var cellElem = event.target || event.srcElement,
        idModel = parseInt($(cellElem).attr('data-id-model')),
        cellModel = this.fieldView.cellCollection.where({idModel: idModel})[0],
        cellXcoord = cellModel.get('xCoord'),
        cellYcoord = cellModel.get('yCoord'),
        cellMark = cellModel.get('mark'),
        cellView = this.fieldView.cellsViewsArr[cellYcoord][cellXcoord];

    if(cellMark == 0) {
      cellModel.set({mark: APP.playerMark});
      cellView.render();

      this.addStep(APP.playerMark, cellXcoord, cellYcoord);

      if(this.fieldView.checkCellLines(APP.playerMark) == APP.playerMark) {
        this.stopGame('Вы выиграли');
      } else if(this.stepsCollection.length >= 9) {
        this.stopGame('Ничья');
      } else { 
        this.compStep(); 
      };            
    } else {
      console.log('глаза протри и смотри куда ходишь')
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

    this.addStep(APP.compMark, emptyCellXcoord, emptyCellYcoord);

    emptyCellModel.set({mark: APP.compMark});
    emptyCellView.render();

      if(this.fieldView.checkCellLines(APP.compMark) == APP.compMark) {
        this.stopGame('Вы проиграли');
      }     

      if(this.stepsCollection.length >= 9) {
        this.stopGame('Ничья');
      }ж       
  },

  addStep: function(mark, xCoord, yCoord) {  
    this.stepsCollection.push({
      num: this.stepNum++,
      xCoord: xCoord,
      yCoord: yCoord,
      mark: mark,
    }); 
  },

  stopGame: function(msg) { 
    alert(msg);
    window.location.reload();
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
  },

  checkCellLines: function(mark) {  //console.log(this.cellsViewsArr)
    var winnerMark = undefined;

    // check diagonal rt-lb
    if( (this.cellsViewsArr[0][0].model.get('mark') == mark) && 
        (this.cellsViewsArr[1][1].model.get('mark') == mark) && 
        (this.cellsViewsArr[2][2].model.get('mark') == mark)
    ) {
      winnerMark = mark;
    };

    // check diagonal lt-rb
    if( (this.cellsViewsArr[0][2].model.get('mark') == mark) && 
        (this.cellsViewsArr[1][1].model.get('mark') == mark) && 
        (this.cellsViewsArr[2][0].model.get('mark') == mark)
    ) {
      winnerMark = mark;
    };   

    // check horizontals
    for(var yCoord = 0; yCoord <= 2; yCoord++) { 
      if( (this.cellsViewsArr[yCoord][0].model.get('mark') == mark) && 
          (this.cellsViewsArr[yCoord][1].model.get('mark') == mark) && 
          (this.cellsViewsArr[yCoord][2].model.get('mark') == mark)
      ) {
        winnerMark = mark;
      };
    };   

    // check verticals  
    for(var xCoord = 0; xCoord <= 2; xCoord++) { 
      if( (this.cellsViewsArr[0][xCoord].model.get('mark') == mark) && 
          (this.cellsViewsArr[1][xCoord].model.get('mark') == mark) && 
          (this.cellsViewsArr[2][xCoord].model.get('mark') == mark)
      ) {
        winnerMark = mark;
      };
    };  

    return winnerMark;
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

    if(this.model.get('mark') == APP.compMark) {
      cellMark = 'zero_mark';
    } else if(this.model.get('mark') == APP.playerMark) {
      cellMark = 'cross_mark';
    };

    return cellMark;
  }

});



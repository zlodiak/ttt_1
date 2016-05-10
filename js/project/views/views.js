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
        cellMark = cellModel.get('mark');

    console.log(this.fieldView.cellCollection.where({idModel: idModel}));

    if(cellMark == 0) {
      cellModel.set({mark: 1});
      this.fieldView.cellsViewsArr[cellYcoord][cellXcoord].render();
    } else {
      console.log('err')
    };
  },



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



// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        //this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var result = _.reduce(this.get(rowIndex), function(result, item) {
        return result += item;
      }, 0);
      return (result >= 2); // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rowNum = this.get('n');
      for(var i = 0; i < rowNum; i++){
        if(this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rowNum = this.get('n');
      var counter = 0;
      for(var i = 0; i<rowNum; i++){
        if(this.get(i)[colIndex]){
          counter++;
        }
      }
      return (counter >= 2); // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var colNum = this.get('n');
      for(var i = 0; i< colNum; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(start) {
      var size = this.get('n'),
          counter = 0;
      for(var i = 0; i < size; i++){
        if(this._isInBounds(i, start+i)){
          counter += this.get(i)[start+i];
        }
      }
      return (counter >= 2); // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n')-1;
      for(var i = -size; i < size; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(start) {
      var size = this.get('n'),
          counter = 0;
      for(var i = 0; i < size; i++){
        if(this._isInBounds(i, start-i)){
          counter += this.get(i)[start-i];
        }
      }
      return (counter >=2); // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n')*2;
      for(var i = size; i>0;i--){
        if(this.hasMinorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false; // fixme
    },

    testRook: function(row, col){
      return /*this.hasRowConflictAt(row) ||*/ this.hasColConflictAt(col);
    },

    testQueen: function(row, col){
      return this.hasRowConflictAt(row) || this.hasColConflictAt(col) ||
      this.hasMajorDiagonalConflictAt(col - row) ||
      this.hasMinorDiagonalConflictAt(row + col);
    },

    buildMatrix: function(){
      var result = _.map(this.attributes, function(val, key){
        if(key !== 'n'){
          return val.slice();
        }
      });
      result.pop();
      return result;
    },

    show: function(){
      console.table(this.rows());
    },

    clear: function(){
      var self = this;
      _.each(this.rows(), function(row, i){
        _.each(row, function(el, j){
          if(el !== 0){
            self.togglePiece(i , j);
          }
        });
      });
    },

    save: function(row) {
      var currentState = this.rows(),
          state = [];
      for(var i = 0; i < row; i++){
        for(j = 0; j< currentState[i].length; j++){
          if(currentState[i][j]){
            state.push(j);
          }
        }
      }
      return state;
    },

    load: function(state) {
      this.clear();
      for(var i = 0; i < state.length; i++){
        this.togglePiece(i,state[i]);
      }
    }
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());

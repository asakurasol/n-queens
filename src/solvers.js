/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = new Board({n:n}); //fixme
  for(var row = 0; row < n; row++){
    // get an array, loop through that array
    for(var col = 0; col < n; col++){
      solution.togglePiece(row, col);
      if(solution.testRook(row,col)){
        solution.togglePiece(row, col);
      } else {
        break;
      }
    }
  }
  var result = solution.buildMatrix();
  //console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result));
  return result;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});
  var recurse = function(board,row) {
    row = row || 0;
    for(var col = 0; col<n; col++){

      board.togglePiece(row, col);

      if(board.testRook(row, col)){ //if it fails
        board.togglePiece(row, col);
      } else if(row+1 === n){
        // console.table(board.buildMatrix());
        solutionCount++;
      } else {
        var matrix = board.buildMatrix();
        var newBoard = new Board(matrix);
        board.togglePiece(row, col);
        recurse(newBoard, row+1);
      }
    }
  };
  recurse(board);
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
  // var _factorial = function(n){
  //   if(n === 1){
  //     return 1;
  //   }
  //   return n*_factorial(n-1);
  // };
  // return _factorial(n);
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution; //fixme
  var board = new Board({n:n});
  if(n === 0 || n === 2 || n === 3 ){ return {n:n}; }

  var recurse = function(board,row) {
    row = row || 0;
    for(var col = 0; col<n; col++){
      board.togglePiece(row, col);
      if(board.testQueen(row, col)){ //if it fails
        board.togglePiece(row, col);
      } else if(row+1 === n){
        solution = board;
      } else {
        var matrix = board.buildMatrix();
        var newBoard = new Board(matrix);
        board.togglePiece(row, col);
        recurse(newBoard, row+1);
      }
    }
  };
  recurse(board);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.buildMatrix();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});
  if(n === 0 || n ===1){return 1;}
  var recurse = function(board,row) {
    row = row || 0;
    for(var col = 0; col<n; col++){
      board.togglePiece(row, col);
      if(board.testQueen(row, col)){ //if it fails
        board.togglePiece(row, col);
      } else if(row+1 === n){
        solutionCount++;
      } else {
        var matrix = board.buildMatrix();
        var newBoard = new Board(matrix);
        board.togglePiece(row, col);
        recurse(newBoard, row+1);
      }
    }
  };
  recurse(board);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

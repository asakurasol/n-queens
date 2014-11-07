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
var findSolution = function(row, board, n, funcName, callback) {
    // find first piece to toggle
    // check toggled piece for validity
  row = row || 0;
  if(row === n){
    return callback(board.rows());
  }
  for(var col = 0; col<n; col++){
    board.togglePiece(row, col);
    if(!board[funcName](row, col)){ //if valid
      if(findSolution(row+1, board, n, funcName, callback)){
        return true;
      }
    }
    board.togglePiece(row, col);
  }
};

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

  findSolution(0, board, n, "testRook", function(){
    solutionCount++;
  });
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solution; //fixme
  var board = new Board({n:n});
  solution = board.rows();

  findSolution(0, board, n, "testQueen", function(result){
    solution = result;
    return true;
  });
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});

  findSolution(0, board, n, "testQueen", function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

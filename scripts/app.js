const Gameboard = (function() {
  const rows = 3;
  const columns = 3;
  const board = [];

  function create() {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(j);
      }
    }
  }

  function get() {
    return board;
  }

  return {
    create,
    get
  };
})();

// 0 empty, 1 player one, 2 player 2
const Square = (function() {
  let value = 0;

  
})();

Gameboard.create();
console.log(Gameboard.get());
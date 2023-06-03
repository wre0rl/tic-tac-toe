const Gameboard = (function() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Create
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;

  const markSquare = (player, row, column) => {
    const square = board[row][column];
    return square ? console.log('That square is marked!') : (board[row][column] = player);
  }

  return {
    getBoard,
    markSquare
  };
})();

function Player(name, mark) {
  this.name = name;
  this.mark = mark; // 1 = X, 2 = O
}

const Game = (function() {
  const player1 = new Player('Bob', 1);
  const player2 = new Player('John', 2);
  const players = [player1, player2];

  let activePlayer = players[0];

  const play = (row, column) => {
    const currentPlayerMark = getActivePlayer().mark;
    const squareMarked = Gameboard.markSquare(currentPlayerMark, row, column);
    return squareMarked ? (switchActivePlayer(), Gameboard.getBoard()) : Gameboard.getBoard();
  }

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const getPlayers = () => players;

  return {
    play,
    getPlayers,
    getActivePlayer
  };
})();


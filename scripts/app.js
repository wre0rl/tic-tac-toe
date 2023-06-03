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

  const get = () => board;

  const mark = (player, row, column) => {
    if (board[row][column] !== 0) {
      return console.log('That square is marked!');
    }
    return board[row][column] = player;
  }

  return {
    get,
    mark
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
    const mark = Gameboard.mark(activePlayer.mark, row, column);
    if (mark === activePlayer.mark) switchActivePlayer();
    return Gameboard.get();
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


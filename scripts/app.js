const Gameboard = (function() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // Create
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push('');
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
  this.mark = mark;
}

const Game = (function() {
  const player1 = new Player('Player 1', 'X');
  const player2 = new Player('Player 2', 'O');
  const players = [player1, player2];

  let activePlayer = players[0];

  const play = (row, column) => {
    const currentPlayerMark = getActivePlayer().mark;
    const squareMarked = Gameboard.markSquare(currentPlayerMark, row, column);
    const isWinner = checkWinner(row, column, squareMarked);
    if (isWinner) {
      console.log(`${getActivePlayer().name} is the winner`);
      // TODO: Reset
    }
    // TODO: wtf is this...
    return squareMarked ? (switchActivePlayer(), Gameboard.getBoard()) : Gameboard.getBoard();
  }

  const checkWinner = (row, column, squareMarked) => {
    const board = Gameboard.getBoard();
    const isRowWinner = checkRow(row, squareMarked, board);
    const isColumnWinner = checkColumn(column, squareMarked, board);
    const isDiagonalWinner = checkDiagonal(squareMarked, board);

    return (
      isRowWinner || 
      isColumnWinner || 
      isDiagonalWinner
    ) ? true : false;
  };

  const checkRow = (row, squareMarked, board) => {
    return board[row].every((mark) => mark === squareMarked);
  };

  const checkColumn = (column, squareMarked, board) => {
    const col = board.map((row) => row[column]);
    return col.every((mark) => mark === squareMarked);
  };

  const checkDiagonal = (squareMarked, board) => {
    const leftDiagonal = [board[0][0], board[1][1], board[2][2]];
    const rightDiagonal = [board[0][2], board[1][1], board[2][0]];
    return leftDiagonal.every((mark) => mark === squareMarked) ||
           rightDiagonal.every((mark) => mark === squareMarked)
  };

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const getPlayers = () => players;

  return {
    play,
    getPlayers,
    getActivePlayer
  };
})();

const UI = (function() {
  // DOM
  const boardDiv = document.querySelector('.board');

  // Bind events
  boardDiv.addEventListener("click", (e) => handleBoardClick(e));

  const render = () => {
    boardDiv.textContent = '';
    
    const board = Gameboard.getBoard();
    let i = 0;
    board.forEach((row) => {
      row.forEach((square, index) => {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('board__square');
        squareDiv.dataset.row = i;
        squareDiv.dataset.column = index;
        squareDiv.textContent = square;
        boardDiv.appendChild(squareDiv);
      });
      i++;
    });
  };

  const handleBoardClick = (e) => {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    Game.play(row, column);
    render();
  };

  render();
})();



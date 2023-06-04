const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push('');
      }
    }
  };

  const getBoard = () => board;

  const resetBoard = () => createBoard();

  const markSquare = (mark, row, column) => {
    const isSquareEmpty = (board[row][column] === '');
    return isSquareEmpty ? (board[row][column] = mark) : false;
  };

  const isBoardNotFull = () => {
    const board = getBoard().flat();
    return board.includes('');
  }
  
  createBoard();

  return {
    getBoard,
    resetBoard,
    markSquare,
    isBoardNotFull
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
  let gameState = 0; // 1: win, 2: tie

  const play = (row, column) => {
    const isSquareMarked = markSquare(row, column);

    if (!isSquareMarked) {
      return console.log('That square is marked!');
    }

    const isWinner = checkWinner(row, column, getActivePlayer().mark);
    if (isWinner) {
      return updateGameState(1);
    }

    const isBoardNotFull = Gameboard.isBoardNotFull();
    if (!isBoardNotFull) {
      return updateGameState(2);
    }

    switchActivePlayer();
  };

  const markSquare = (row, column) => {
    const currentPlayerMark = getActivePlayer().mark;
    return Gameboard.markSquare(currentPlayerMark, row, column);
  };

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

  const resetActivePlayer = () => {
    activePlayer = players[0];
  };

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const getPlayers = () => players;

  const getGameState = () => gameState;

  const updateGameState = (state) => {
    gameState = state;
  };

  const resetGameState = () => {
    gameState = 0;
  };

  const reset = () => {
    Gameboard.resetBoard();
    resetActivePlayer();
    resetGameState();
  };

  return {
    play,
    getPlayers,
    getActivePlayer,
    getGameState,
    reset
  };
})();

const UI = (() => {
  // DOM
  const boardContainer = document.querySelector('.board');
  const playerTurnDiv = document.querySelector('.turn');

  // Bind events
  boardContainer.addEventListener("click", (e) => handleBoardClick(e));

  const renderBoard = () => {
    boardContainer.innerHTML = '';
  
    const board = Gameboard.getBoard();
    board.forEach((row, i) =>
      row.forEach((square, j) => {
        const squareDiv = createSquareDiv(i, j, square);
        boardContainer.appendChild(squareDiv);
      })
    );
  };
  
  const createSquareDiv = (row, column, value) => {
    const squareDiv = document.createElement('div');
    squareDiv.classList.add('board__square');
    squareDiv.dataset.row = row;
    squareDiv.dataset.column = column;
    squareDiv.textContent = value;
    return squareDiv;
  };

  const renderGameInfo = () => {
    const state = Game.getGameState();
    const player = Game.getActivePlayer().name;
    const message = (state === 1)
      ? `${player} wins!`
      : (state === 2)
        ? 'It\'s a tie!'
        : `${player}'s turn`;
    playerTurnDiv.textContent = message;
  };

  const render = () => {
    renderBoard();
    renderGameInfo();
  };

  const handleSquareClick = (row, column) => {
    const state = Game.getGameState();
    const isGameOver = (state > 0);
    (isGameOver) ? Game.reset() : Game.play(row, column);
    render();
  };
      
  const handleBoardClick = (e) => {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    handleSquareClick(row, column);
  };
      
  render();
})();
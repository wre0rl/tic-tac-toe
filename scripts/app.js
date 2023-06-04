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

  const markSquare = (player, row, column) => {
    const square = board[row][column];
    return square ? false : (board[row][column] = player);
  }

  createBoard();

  return {
    getBoard,
    resetBoard,
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
  let winner = [];

  const play = (row, column) => {
    const isSquareMarked = markSquare(row, column);

    if (!isSquareMarked) {
      return;
    }

    const isWinner = checkWinner(row, column, getActivePlayer().mark);

    if (isWinner) {
      winner.push(getActivePlayer().name);
    } else {
      switchActivePlayer();
    }
  };

  const markSquare = (row, column) => {
    const currentPlayerMark = getActivePlayer().mark;
    const isSquareMarked = Gameboard.markSquare(currentPlayerMark, row, column);

    if (!isSquareMarked) {
      console.log('That square is marked!');
      return false;
    }

    return true;
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

  const getWinner = () => winner;

  const resetWinner = () => winner = [];

  const reset = () => {
    Gameboard.resetBoard();
    resetWinner();
    resetActivePlayer();
  };

  return {
    play,
    getPlayers,
    getActivePlayer,
    getWinner,
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
    boardContainer.textContent = '';
    
    const board = Gameboard.getBoard();
    let i = 0;
    board.forEach((row) => {
      row.forEach((square, index) => {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('board__square');
        squareDiv.dataset.row = i;
        squareDiv.dataset.column = index;
        squareDiv.textContent = square;
        boardContainer.appendChild(squareDiv);
      });
      i++;
    });
  };

  const renderGameInfo = () => {
    const winner = Game.getWinner();
    const message = winner.length > 0
      ? `${winner[0]} is the winner!`
      : `${Game.getActivePlayer().name}`;
    playerTurnDiv.textContent = message;
  };

  const render = () => {
    renderBoard();
    renderGameInfo();
  };

  const handleSquareClick = (row, column) => {
    const isGameOver = Game.getWinner().length > 0;
    isGameOver ? Game.reset() : Game.play(row, column);
    render();
  };
      
  const handleBoardClick = (e) => {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;
    handleSquareClick(row, column);
  };
      
  render();
})();
      
      



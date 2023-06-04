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
    // Refactor the check winner logic, and check draw
    const a = checkRow(row, squareMarked);
    const b = checkColumn(column, squareMarked);
    const c = checkDiagonal(squareMarked);
    a || b || c ? console.log(`${getActivePlayer().name} is the winner`) : null;
    return squareMarked ? (switchActivePlayer(), Gameboard.getBoard()) : Gameboard.getBoard(); // Remove this...
  }

  const checkRow = (row, squareMarked) => {
    const board = Gameboard.getBoard();
    return board[row].every((col) => col === squareMarked);
  };

  const checkColumn = (column, squareMarked) => {
    const board = Gameboard.getBoard();
    let temp = [];
    board.forEach((row) => {
      temp.push(row[column]);
    });
    return temp.every((col) => col === squareMarked);
  };

  const checkDiagonal = (squareMarked) => {
    let board = Gameboard.getBoard();
    let leftDiag = [];
    let leftCol = 0;
    let rightDiag = [];
    let rightCol = 2;
    board.forEach((row) => {
      leftDiag.push(row[leftCol++]);
      rightDiag.push(row[rightCol--]);
    });

    const isWinLeft = leftDiag.every((col) => col === squareMarked);
    const isWinRight = rightDiag.every((col) => col === squareMarked);
    return isWinLeft || isWinRight ? true : false;
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



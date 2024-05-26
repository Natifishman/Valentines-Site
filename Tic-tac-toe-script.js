const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const handleCellClick = (e) => {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (board[cellIndex] !== '' || !gameActive) return;

  placeMark(cell, cellIndex);
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setTimeout(computerTurn, 500);
  }
};

const placeMark = (cell, index) => {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('played');
};

const swapTurn = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWin = () => {
  return winningCombos.some(combination => {
    return combination.every(index => {
      return board[index] === currentPlayer;
    });
  });
};

const isDraw = () => {
  return board.every(cell => {
    return cell !== '';
  });
};

const endGame = (draw) => {
  if (draw) {
    statusDisplay.textContent = 'It\'s a Draw!';
  } else {
    statusDisplay.textContent = `${currentPlayer} Wins!`;
  }
  gameActive = false;
};

const restartGame = () => {
  currentPlayer = 'X';
  gameActive = true;
  board = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('played');
  });
};

restartBtn.addEventListener('click', restartGame);

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

const computerTurn = () => {
  const emptyCells = board.reduce((acc, val, index) => {
    if (val === '') acc.push(index);
    return acc;
  }, []);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex];
  const cell = cells[cellIndex];
  placeMark(cell, cellIndex);
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
  }
};

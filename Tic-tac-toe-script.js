document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('[data-cell]');
  const statusDisplay = document.getElementById('status');
  const restartBtn = document.getElementById('restartBtn');
  const playerWinCountDisplay = document.getElementById('playerWinCount');
  const computerWinCountDisplay = document.getElementById('computerWinCount');

  let currentPlayer = 'X';
  let gameActive = true;
  let board = ['', '', '', '', '', '', '', '', ''];
  let playerWins = 0;
  let computerWins = 0;

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

  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  restartBtn.addEventListener('click', restartGame);

  function handleCellClick(e) {
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
  }

  function placeMark(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('played');
    cell.style.animation = 'bounceIn 0.5s';
  }

  function swapTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }

  function checkWin() {
    return winningCombos.some(combination => {
      return combination.every(index => {
        return board[index] === currentPlayer;
      });
    });
  }

  function isDraw() {
   

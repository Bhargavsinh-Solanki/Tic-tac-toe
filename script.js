const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = 'X';
let gameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return gameBoard[a] === currentPlayer &&
           gameBoard[b] === currentPlayer &&
           gameBoard[c] === currentPlayer;
  });
}

function checkDraw() {
  return gameBoard.every(cell => cell !== ' ');
}

function handleMove(index) {
  if (!gameActive || gameBoard[index] !== ' ') return;

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn.`;
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleMove(index));
});

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function checkWinner() {
  for (const combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a];
    }
  }
  return gameState.includes("") ? null : "Draw";
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] || checkWinner()) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const result = checkWinner();
  if (result) {
    statusText.textContent = result === "Draw" ? "It's a Draw!" : `Player ${result} Wins!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  gameState = Array(9).fill("");
  currentPlayer = 'X';
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

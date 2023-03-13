const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameWon = false;
const winningConditions = [
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
  cell.addEventListener('click', () => {
    if (cell.textContent === '' && !gameWon) {
      cell.textContent = currentPlayer;
      if (checkWin()) {
        alert(`${currentPlayer} wins!`);
        gameWon = true;
      } else if (checkDraw()) {
        alert('Draw!');
        gameWon = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  });
});

function checkWin() {
  return winningConditions.some(condition => {
    return condition.every(cellIndex => {
      return cells[cellIndex].textContent === currentPlayer;
    });
  });
}

function checkDraw() {
  return Array.from(cells).every(cell => {
    return cell.textContent !== '';
  });
}

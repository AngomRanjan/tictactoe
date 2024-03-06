let currentPlayer = "X";
let gameOver = false;
const playerSymbol = document.getElementById("player-symbol");

isBoardFilled = () => {
  const cells = [...document.querySelectorAll('[data-type="cell"]')];
  return cells.every(cell => cell.textContent !== '');
};

const checkWinner = () => {
  const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const sqrA = document.getElementById(a).textContent;
    const sqrB = document.getElementById(b).textContent;
    const sqrC = document.getElementById(c).textContent;
    if (sqrA !== '' && sqrA === sqrB && sqrA === sqrC) {
      return true;
    }
  }

  return false;
};

const handleCellClick = (e) => {
  const cell = e.target;
  if (gameOver || cell.dataset.type !== "cell" || (cell.dataset.type === "cell" && cell.textContent !== '')) return;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    gameOver = true;
    document.getElementById('result').textContent = `Result: Player ${currentPlayer} wins!`;
  } else if (isBoardFilled()) {
    gameOver = true;
    document.getElementById('result').textContent = 'Result: It\'s a tie!';
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerSymbol.textContent = currentPlayer;
  }
};

document.getElementById("board").addEventListener("click", handleCellClick);

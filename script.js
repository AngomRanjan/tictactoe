let currentPlayer = "X";
const playerSymbol = document.getElementById("player-symbol");

const checkWinner = () => {
  const winPatterns = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7]             // Diagonals
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
  if (cell.dataset.type !== "cell") return;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById('result').textContent = `Result: Player ${currentPlayer} wins!`;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerSymbol.textContent = currentPlayer;
};

document.getElementById("board").addEventListener("click", handleCellClick);

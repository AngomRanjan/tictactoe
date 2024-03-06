let currentPlayer = "X";
const playerSymbol = document.getElementById("player-symbol");

const handleCellClick = (e) => {
  const cell = e.target;
  if (cell.dataset.type !== "cell") return;
  cell.textContent = currentPlayer;

  currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerSymbol.textContent = currentPlayer;
};

document.getElementById("board").addEventListener("click", handleCellClick);

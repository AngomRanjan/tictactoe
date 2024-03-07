const initializeGame = () => {
  const currentPlayerSymbol = document.getElementById("player-symbol");
  const result = document.getElementById("result");
  const cells = Array.from(document.querySelectorAll('[data-type="cell"]'));
  const boardElement = document.getElementById("board");
  const resetButton = document.getElementById("reset-button");

  let currentPlayer = "X";
  let gameOver = false;

  const isBoardFilled = () => cells.every((cell) => cell.textContent !== "");

  const checkWinner = () => {
    const winPatterns = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      const sqrA = document.getElementById(a).textContent;
      const sqrB = document.getElementById(b).textContent;
      const sqrC = document.getElementById(c).textContent;
      if (sqrA !== "" && sqrA === sqrB && sqrA === sqrC) {
        return true;
      }
    }

    return false;
  };

  const updateResult = () => {
    if (checkWinner()) {
      result.textContent = `Result: Player ${currentPlayer} wins!`;
    } else if (isBoardFilled()) {
      result.textContent = "Result: It's a tie!";
    } else {
      result.textContent = "Game in progress...";
    }
  };

  const resetGame = () => {
    cells.forEach((cell) => (cell.textContent = ""));
    result.textContent = "";
    currentPlayer = "X";
    currentPlayerSymbol.textContent = currentPlayer;
    gameOver = false;
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerSymbol.textContent = currentPlayer;
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    if (gameOver || cell.dataset.type !== "cell" || cell.textContent !== "")
      return;
    cell.textContent = currentPlayer;
    gameOver = checkWinner() || isBoardFilled();
    if (!gameOver) switchPlayer();
    updateResult();
  };

  boardElement.addEventListener("click", handleCellClick);
  resetButton.addEventListener("click", resetGame);
};

document.addEventListener("DOMContentLoaded", initializeGame);

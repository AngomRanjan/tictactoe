const Gameboard = (() => {
  const board = Array(9).fill('');

  const isCellEmpty = (index) => board[index] === '';

  const isBoardFilled = () => board.every((cell) => cell !== "");

  const markCell = (index, marker) => {
      if (isCellEmpty(index)) board[index] = marker;
  };

  const resetBoard = () => board.fill('');
  
  return {
      get currentBoard() { return [...board] },
      isCellEmpty,
      isBoardFilled,
      markCell,
      resetBoard,
  };
})();

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
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
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
    Gameboard.resetBoard();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    currentPlayerSymbol.textContent = currentPlayer;
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    const { isCellEmpty, markCell } = Gameboard;
    const id = parseInt(cell.id);
    if (gameOver || cell.dataset.type !== "cell" || !isCellEmpty(id)) return;
    cell.textContent = currentPlayer;
    markCell(id, currentPlayer);
    gameOver = checkWinner() || isBoardFilled();
    if (!gameOver) switchPlayer();
    updateResult();
  };

  boardElement.addEventListener("click", handleCellClick);
  resetButton.addEventListener("click", resetGame);
};

document.addEventListener("DOMContentLoaded", initializeGame);

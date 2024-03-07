const Gameboard = (() => {
  const board = Array(9).fill('');

  const isCellEmpty = (index) => board[index] === '';

  const isBoardFilled = () => board.every((cell) => cell !== "");

  const markCell = (index, marker) => {
      if (isCellEmpty(index)) board[index] = marker;
  };

  const resetBoard = () => board.fill('');
  
  return {
      get currentBoard() { return board },
      isCellEmpty,
      isBoardFilled,
      markCell,
      resetBoard,
  };
})();

const Player = (name, symbol) => {
  return {
      name,
      symbol,
  };
};

const Game = (() => {
  const player1 = Player('Player 1', 'X');
  const player2 = Player('Player 2', 'O');
  let currentPlayer = player1;
  let isGameOver = false;
  let winner = null;

  const { isCellEmpty, isBoardFilled, markCell, currentBoard, resetBoard } = Gameboard;

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

  const checkWinner = () => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] !== "" &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        winner = currentPlayer;
        return true;
      }
    }

    return false;
  };

  const isValidMove = (index) => isCellEmpty(index) && !isGameOver;

  const makeMove = (index) => {
    if (isValidMove(index)) {
      markCell(index, currentPlayer.symbol);
      return true;
    }
    return false;
  }

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const status = () => {
    isGameOver = checkWinner() || isBoardFilled();
    if (isGameOver) {
      return winner ? `Result: ${winner.name} wins!` : "It's a tie!";
    } else {
      switchPlayer();
      return "Game in progress...";
    }
  };

  const resetGame = () => {
    resetBoard();
    currentPlayer = player1;
    winner = null;
    isGameOver = false;
  };

  return {
    get currentPlayer() { return currentPlayer },
    makeMove,
    status,
    resetGame
  };
})();

const initializeGame = () => {
  const currentPlayerSymbol = document.getElementById("player-symbol");
  const result = document.getElementById("result");
  const cells = Array.from(document.querySelectorAll('[data-type="cell"]'));
  const boardElement = document.getElementById("board");
  const resetButton = document.getElementById("reset-button");

  const updateResult = (msg) => {
    result.textContent = msg;
  };

  const resetGame = () => {
    cells.forEach((cell) => (cell.textContent = ""));
    result.textContent = "";
    Game.resetGame();
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    const { currentPlayer, makeMove } = Game;
    const id = parseInt(cell.id);
    if (cell.dataset.type !== "cell" || !makeMove(id)) return;
    cell.textContent = currentPlayer.symbol;
    updateResult(Game.status());
  };

  boardElement.addEventListener("click", handleCellClick);
  resetButton.addEventListener("click", resetGame);
};

document.addEventListener("DOMContentLoaded", initializeGame);

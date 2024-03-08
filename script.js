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

const Player = (name, symbol) => ({ name, symbol });

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
    if (
      winPatterns.some(
        ([a, b, c]) =>
          currentBoard[a] !== "" &&
          currentBoard[a] === currentBoard[b] &&
          currentBoard[a] === currentBoard[c]
      )
    ) {
      winner = currentPlayer;
      return true;
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
      return winner ? `Result: ${winner.name} wins!` : "Result: It's a tie!";
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

const displayController = (() => {
  const playerNameElement = document.getElementById("player-name");
  const playerSymbolElement = document.getElementById("player-symbol");
  const result = document.getElementById("result");
  const cells = Array.from(document.querySelectorAll('[data-type="cell"]'));

  const displayCurrentPlayer = ({ name, symbol }) => {
    playerNameElement.textContent = name;
    playerSymbolElement.textContent = symbol;
  };

  const displayResult = (msg) => {
    result.textContent = msg;
  };

  const displayCellContent = (index, symbol) => {
    cells[index].textContent = symbol;
  };

  const resetDisplay = () => {
    cells.forEach((cell) => (cell.textContent = ""));
    result.textContent = "";
  };

  const updateDisplay = (cellIndex, Game) => {
    displayCellContent(cellIndex, Game.currentPlayer.symbol);
    displayResult(Game.status());
    displayCurrentPlayer(Game.currentPlayer);
  };

  return {
    displayCurrentPlayer,
    updateDisplay,
    resetDisplay
  };
})();

const main = () => {
  const boardElement = document.getElementById("board");
  const resetButton = document.getElementById("reset-button");

  const { displayCurrentPlayer, resetDisplay, updateDisplay } = displayController;
  const { makeMove, resetGame } = Game;

  displayCurrentPlayer(Game.currentPlayer);

  const handleResetBtnClick = () => {
    resetGame();
    resetDisplay();
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    const id = parseInt(cell.id);
    if (cell.dataset.type !== "cell" || !makeMove(id)) return;
    updateDisplay(id, Game);
  };

  boardElement.addEventListener("click", handleCellClick);
  resetButton.addEventListener("click", handleResetBtnClick);
};

document.addEventListener("DOMContentLoaded", main);

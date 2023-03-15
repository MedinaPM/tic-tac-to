// Factory Function Player ************************************
const Player = (playerName, marker) => {
  const getMarker = () => marker;

  const getPlayerName = () => playerName;

  const printNamesBoard = () => {
    const container = document.querySelector(".names-board");
    const content = document.createElement("p");
    content.textContent = `Player ${marker}: ${playerName}`;
    container.appendChild(content);
  };

  return {
    getMarker,
    getPlayerName,
    printNamesBoard,
  };
};
// ************************************************************

// Module Pattern Game Board **********************************
const gameBoard = (() => {
  const board = document.querySelector(".game-board");
  const form = document.querySelector(".players-name-form");

  /*
  Game board array
    0 | 1 | 2
   --- --- ---
    3 | 4 | 5
   --- --- ---
    6 | 7 | 8
  */

  const gameBoardMoves = ["", "", "", "", "", "", "", "", ""];

  const displayPlayerMove = (indNum, marker) => {
    gameBoardMoves[indNum] = marker;
    const container = document.querySelector(`#game-board__${indNum}`);
    container.textContent = marker;
  };

  const newBoard = () => {
    board.style.display = "grid";
  };

  const clearBoard = () => {
    for (let i = 0; i < gameBoardMoves.length; i += 1) {
      gameBoardMoves[i] = "";
      displayPlayerMove(i, "");
    }
  };

  const clearPlayerNames = () => {
    const element = document.querySelector(".names-board");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  const newGame = () => {
    board.style.display = "none";
    form.style.display = "none";
    clearPlayerNames();
    clearBoard();
  };

  const getForm = () => {
    form.style.display = "flex";
  };

  return {
    form,
    gameBoardMoves,
    displayPlayerMove,
    newBoard,
    clearBoard,
    clearPlayerNames,
    newGame,
    getForm,
  };
})();
// ************************************************************

// Module Pattern Game Controller *****************************
const gameController = (() => {
  let marker = "X";
  let gameType = "";
  let playerX = [];
  let playerO = [];
  const playerNameX = document.querySelector("#player-name-X");
  const playerNameO = document.querySelector("#player-name-O");

  const startOnePlayerGame = () => {
    gameBoard.clearPlayerNames();
    gameBoard.clearBoard();
    playerX = Player("User", "X");
    playerO = Player("Computer", "O");
    playerX.printNamesBoard();
    playerO.printNamesBoard();
    gameBoard.form.style.display = "none";
    gameBoard.newBoard();
  };

  const startTwoPlayersGame = () => {
    gameBoard.clearPlayerNames();
    gameBoard.clearBoard();
    playerX = Player(playerNameX.value, "X");
    playerO = Player(playerNameO.value, "O");
    playerX.printNamesBoard();
    playerO.printNamesBoard();
    gameBoard.form.style.display = "none";
    gameBoard.newBoard();
  };

  const printGameResults = (winner, loser) => {
    gameBoard.clearPlayerNames();
    const container = document.querySelector(".names-board");
    const contentW = document.createElement("p");
    contentW.textContent = `${winner} wins!`;
    container.appendChild(contentW);
    const contentL = document.createElement("p");
    contentL.textContent = `${loser} lose!`;
    container.appendChild(contentL);
  };

  const checkIfGameIsOver = () => {
    const GB0 = gameBoard.gameBoardMoves[0];
    const GB1 = gameBoard.gameBoardMoves[1];
    const GB2 = gameBoard.gameBoardMoves[2];
    const GB3 = gameBoard.gameBoardMoves[3];
    const GB4 = gameBoard.gameBoardMoves[4];
    const GB5 = gameBoard.gameBoardMoves[5];
    const GB6 = gameBoard.gameBoardMoves[6];
    const GB7 = gameBoard.gameBoardMoves[7];
    const GB8 = gameBoard.gameBoardMoves[8];

    if (
      (GB0 === "X" && GB1 === "X" && GB2 === "X") ||
      (GB3 === "X" && GB4 === "X" && GB5 === "X") ||
      (GB6 === "X" && GB7 === "X" && GB8 === "X") ||
      (GB0 === "X" && GB3 === "X" && GB6 === "X") ||
      (GB1 === "X" && GB4 === "X" && GB7 === "X") ||
      (GB2 === "X" && GB5 === "X" && GB8 === "X") ||
      (GB0 === "X" && GB4 === "X" && GB8 === "X") ||
      (GB2 === "X" && GB4 === "X" && GB6 === "X")
    ) {
      printGameResults(playerX.getPlayerName(), playerO.getPlayerName());
    } else if (
      (GB0 === "O" && GB1 === "O" && GB2 === "O") ||
      (GB3 === "O" && GB4 === "O" && GB5 === "O") ||
      (GB6 === "O" && GB7 === "O" && GB8 === "O") ||
      (GB0 === "O" && GB3 === "O" && GB6 === "O") ||
      (GB1 === "O" && GB4 === "O" && GB7 === "O") ||
      (GB2 === "O" && GB5 === "O" && GB8 === "O") ||
      (GB0 === "O" && GB4 === "O" && GB8 === "O") ||
      (GB2 === "O" && GB4 === "O" && GB6 === "O")
    ) {
      printGameResults(playerO.getPlayerName(), playerX.getPlayerName());
    } else if (
      !(GB0 === "") &&
      !(GB1 === "") &&
      !(GB2 === "") &&
      !(GB3 === "") &&
      !(GB4 === "") &&
      !(GB5 === "") &&
      !(GB6 === "") &&
      !(GB7 === "") &&
      !(GB8 === "")
    ) {
      gameBoard.clearPlayerNames();
      const nameX = playerX.getPlayerName();
      const nameO = playerO.getPlayerName();
      const container = document.querySelector(".names-board");
      const content = document.createElement("p");
      content.textContent = `${nameX} and ${nameO} tied the game!`;
      container.appendChild(content);
    }
  };

  const getRandomAIMove = (objectLength) => {
    const move = Math.floor(Math.random() * objectLength);
    return move;
  };

  const computerMove = () => {
    const options = [];
    const boardLength = gameBoard.gameBoardMoves.length;

    for (let i = 0; i < boardLength; i += 1) {
      if (gameBoard.gameBoardMoves[i] === "") {
        options.push(i);
      }
    }
    const AImove = getRandomAIMove(options.length);
    gameBoard.displayPlayerMove(options[AImove], marker);
    marker = marker === "X" ? "O" : "X";
  };

  const makeNextMove = (indNum) => {
    gameBoard.displayPlayerMove(indNum, marker);
    checkIfGameIsOver();
    marker = marker === "X" ? "O" : "X";
    if (gameType === "onePlayer") {
      computerMove();
    }
  };

  const checkBoardIdEmpty = (indNum) => {
    if (gameBoard.gameBoardMoves[indNum] === "") {
      makeNextMove(indNum);
    }
  };

  const clickListener = (e) => {
    switch (e.target.id) {
      case "nav__button-single-player":
        marker = "X";
        gameType = "onePlayer";
        startOnePlayerGame();
        break;
      case "nav__button-two-players":
        gameBoard.getForm();
        break;
      case "players-name-form__button-submit":
        marker = "X";
        gameType = "twoPlayers";
        startTwoPlayersGame();
        break;
      case "button-new-game":
        gameBoard.newGame();
        break;
      case "game-board__0":
        checkBoardIdEmpty(0);
        break;
      case "game-board__1":
        checkBoardIdEmpty(1);
        break;
      case "game-board__2":
        checkBoardIdEmpty(2);
        break;
      case "game-board__3":
        checkBoardIdEmpty(3);
        break;
      case "game-board__4":
        checkBoardIdEmpty(4);
        break;
      case "game-board__5":
        checkBoardIdEmpty(5);
        break;
      case "game-board__6":
        checkBoardIdEmpty(6);
        break;
      case "game-board__7":
        checkBoardIdEmpty(7);
        break;
      case "game-board__8":
        checkBoardIdEmpty(8);
        break;
      default:
    }
  };

  return {
    clickListener,
  };
})();
// ************************************************************

document.addEventListener("click", gameController.clickListener);
// Factory Function Player
const Player = (playerName, marker) => {
  const printNamesBoard = () => {
    const container = document.querySelector(".names-board");
    const content = document.createElement("p");
    content.textContent = `Player ${marker}: ${playerName}`;
    container.appendChild(content);
  };
  return { printNamesBoard };
};

// Module Pattern Game Board
const gameBoard = (() => {
  const board = document.querySelector(".game-board");
  const form = document.querySelector(".players-name-form");
  const playerNameX = document.querySelector("#player-name-X");
  const playerNameO = document.querySelector("#player-name-O");

  const newBoard = () => {
    board.style.display = "grid";
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
  };

  const getForm = () => {
    form.style.display = "flex";
  };

  const getPlayersNames = () => {
    clearPlayerNames();
    const playerX = Player(playerNameX.value, "X");
    const playerO = Player(playerNameO.value, "O");
    playerX.printNamesBoard();
    playerO.printNamesBoard();
    form.style.display = "none";
    newBoard();
  };

  return {
    newBoard,
    clearPlayerNames,
    newGame,
    getForm,
    getPlayersNames,
  };
})();

// Module Pattern Game Controller
const gameController = (() => {
  const clickListener = (e) => {
    switch (e.target.id) {
      case "nav__button-single-player":
        gameBoard.newBoard();
        break;
      case "nav__button-two-players":
        gameBoard.getForm();
        break;
      case "button-new-game":
        gameBoard.newGame();
        break;
      case "players-name-form__button-submit":
        gameBoard.getPlayersNames();
        break;
      case "game-board__A1":
        console.log("game-board__A1 button");
        break;
      case "game-board__B1":
        console.log("game-board__B1 button");
        break;
      case "game-board__C1":
        console.log("game-board__C1 button");
        break;
      case "game-board__A2":
        console.log("game-board__A2 button");
        break;
      case "game-board__B2":
        console.log("game-board__B2 button");
        break;
      case "game-board__C2":
        console.log("game-board__C2 button");
        break;
      case "game-board__A3":
        console.log("game-board__A3 button");
        break;
      case "game-board__B3":
        console.log("game-board__B3 button");
        break;
      case "game-board__C3":
        console.log("game-board__C3 button");
        break;
      default:
    }
  };
  return {
    clickListener,
  };
})();

document.addEventListener("click", gameController.clickListener);
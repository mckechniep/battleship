const gridSize = 5;
const shipLength = 3;
let attempts = 0;
let computerBoard = createBoard(gridSize);
let computerShip = placeShip(computerBoard, shipLength);
let gameBoardElement = document.getElementById("board");
let messageElement = document.getElementById("message");

//making a 2D array / similar to tic tac toe
function createBoard(size) {
  let board = [];
  for (let i = 0; i < size; i++) {
    board.push(new Array(size).fill("~"));
  }
  return board;
}

function placeShip(board, length) {
  let direction = Math.random() < 0.5 ? "H" : "V"; // condition ? trueExpression : falseExpression to set ship direction either horizontal or vertical
  let startRow, startCol; //initialize starting positions

  if (direction === "H") {
    startRow = Math.floor(Math.random() * gridSize); // random row
    startCol = Math.floor(Math.random() * (gridSize - length + 1)); // make sure ship fits within grid horizontally
    for (let i = 0; i < length; i++) {
      board[startRow][startCol + i] = "S"; // marks horiziontal ships position
    }
  } else {
    startRow = Math.floor(Math.random() * (gridSize - length + 1)); // ship fits within grid vertically
    startCol = Math.floor(Math.random() * gridSize); // random starting colum
    for (let i = 0; i < length; i++) {
      board[startRow + i][startCol] = "S"; // marks ships vertical position
    }
  }
}

function createBoardUI() {
  gameBoardElement.innerHTML = ""; // Clears any existing elements in the board
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let cell = document.createElement("div"); // Creates a new div for each cell
      cell.classList.add("cell"); // Adds the 'cell' class for styling
      cell.dataset.row = row; // Stores the row index as a data attribute
      cell.dataset.col = col; // Stores the column index as a data attribute
      cell.addEventListener("click", handleCellClick); // Adds an event listener for clicks
      gameBoardElement.appendChild(cell); // Adds the cell to the board element in the DOM
    }
  }
}
function handleCellClick(event) {
  let row = parseInt(event.target.dataset.row); // Retrieves the row index from the clicked cell
  let col = parseInt(event.target.dataset.col); // Retrieves the column index from the clicked cell

  if (computerBoard[row][col] === "S") {
    computerBoard[row][col] = "X"; // Mark hit on the board
    event.target.classList.add("hit"); // Apply hit style to the cell
    event.target.textContent = "X"; // Display 'X' for hit
    checkWin(); // Check if the game is won
  } else {
    computerBoard[row][col] = "O"; // Mark miss on the board
    event.target.classList.add("miss"); // Apply miss style to the cell
    event.target.textContent = "O"; // Display 'O' for miss
  }

  event.target.classList.add("disabled"); // Disable further clicks on this cell
  event.target.removeEventListener("click", handleCellClick); // Remove click listener
}
function checkWin() {
  for (let row of computerBoard) {
    if (row.includes("S")) {
      return; // If any part of the ship is still there, the game continues
    }
  }
  messageElement.textContent = `You sank the battleship in ${attempts} attempts!`; // Display win message
  disableAllCells(); // Disable all cells since the game is over
}
function disableAllCells() {
  let cells = document.querySelectorAll(".cell"); // Selects all cells
  cells.forEach((cell) => {
    cell.classList.add("disabled"); // Adds a disabled style
    cell.removeEventListener("click", handleCellClick); // Removes click event listeners
  });
}
createBoardUI(); // starts the game (calls the function to create the board UI when the game loads

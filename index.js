import prompt from "prompt";
import readlineSync from 'readline-sync'

let board = [];

for (let row = 0; row < 10; row++) {
  board[row] = [];
  for (let col = 0; col < 10; col++) {
    board[row][col] = "~";
  }
}

function printBoard() {
  for (let row = 0; row < 10; row++) {
    console.log(board[row].join(" "))
  }
}

function placeShips() {
    const shipSizes = [5, 4, 3, 3, 2];
    const positions = [];
  
  for (let i = 0; i < shipSizes.length; i++) {
    const shipSize = shipSizes[i];
    const direction = Math.floor(Math.random() * 2);
    
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (!validPosition(row, col, direction, shipSize, positions));
    
    for (let j = 0; j < shipSize; j++) {
      if (direction == 0) {
        positions.push([row, col + j]);
      } else {
        positions.push([row + j, col]);
      }
    }
  }
  
  for (let i = 0; i < positions.length; i++) {
    const row = positions[i][0];
    const col = positions[i][1];
    board[row][col] = "O";
  }
}
function validPosition(row, col, direction, shipSize, positions) {
  if (direction == 0 && col + shipSize > 10) return false;
  if (direction == 1 && row + shipSize > 10) return false;
  
  for (let i = 0; i < shipSize; i++) {
    let nextRow = row;
    let nextCol = col;
    if (direction == 0) {
      nextCol += i;
    } else {
      nextRow += i;
    }
    if (nextRow < 0 || nextRow >= 10 || nextCol < 0 || nextCol >= 10) return false;
    for (let j = 0; j < positions.length; j++) {
      if (nextRow == positions[j][0] && nextCol == positions[j][1]) {
        return false;
      }
    }
  }
  return true;
}
let shipsRemaining = 5;
let shotsTaken = 0;
printBoard();
placeShips();
console.log("Ships is placed!");
while (shipsRemaining > 0) {
    const guessRow = Number(readlineSync.question("Write number of row (from 0 to 9):"));
    const guessCol = Number(readlineSync.question("Write number of collumn (from 0 to 9):"));
  if (board[guessRow][guessCol] == "O") {
    console.log("Hit!");
    board[guessRow][guessCol] = "X";
    shipsRemaining--;
  } else if (board[guessRow][guessCol] == "X") {
    console.log("You have already guessed this cell!");
  } else {
    console.log("Miss!");
    board[guessRow][guessCol] = "+";
  }
  printBoard();
  shotsTaken++;
}
console.log("You won for a " + shotsTaken + " attempts!");

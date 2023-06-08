import prompt from 'prompt';
import readlineSync from 'readline-sync';

let boardP1 = [];
let boardP2 = [];
let player1ShotsTaken = 0;
let player2ShotsTaken = 0;
let player1ShipsRemaining = 5;
let player2ShipsRemaining = 5;
let isAgainstBot;

function initBoard(board) {
  for (let row = 0; row < 10; row++) {
    board[row] = [];
    for (let col = 0; col < 10; col++) {
      board[row][col] = '~';
    }
  }
}

function printBoard(board) {
  console.log('  0 1 2 3 4 5 6 7 8 9');
  for (let row = 0; row < 10; row++) {
    console.log(`${row} ${board[row].join(' ')}`);
  }
}

function placeShips(board) {
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
      if (direction === 0) {
        positions.push([row, col + j]);
      } else {
        positions.push([row + j, col]);
      }
    }
  }

  for (let i = 0; i < positions.length; i++) {
    const row = positions[i][0];
    const col = positions[i][1];
    board[row][col] = 'O';
  }
}

function validPosition(row, col, direction, shipSize, positions) {
  if (direction === 0 && col + shipSize > 10) {
    return false;
  }
  if (direction === 1 && row + shipSize > 10) {
    return false;
  }
  for (let i = 0; i < shipSize; i++) {
    let nextRow = row;
    let nextCol = col;
    if (direction === 0) {
      nextCol += i;
    } else {
      nextRow += i;
    }
    if (nextRow < 0 || nextRow >= 10 || nextCol < 0 || nextCol >= 10) return false;
    for (let j = 0; j < positions.length; j++) {
      if (nextRow === positions[j][0] && nextCol === positions[j][1]) {
        return false;
      }
    }
  }
  return true;
}

function takeTurn(board, playerName, shipsRemaining, shotsTaken) {
  console.log(`${playerName} turn:`);
  printBoard(board);
  const guessRow = Number(readlineSync.question(`${playerName}, enter row to shoot (0-9):`));
  const guessCol = Number(readlineSync.question(`${playerName}, enter column to shoot (0-9):`));
  if (board[guessRow][guessCol] === 'O') {
    console.log('HIT!');
    board[guessRow][guessCol] = 'X';
    shipsRemaining--;
  } else if (board[guessRow][guessCol] === 'X') {
    console.log('You have already guessed this cell!');
  } else {
    console.log('MISS!');
    board[guessRow][guessCol] = '+';
  }
  shotsTaken++;
  return shipsRemaining;
}

function runGame() {
  console.log('Welcome to Battleship!');

  const choice = readlineSync.question('Will you play against a human or a bot? (human/bot)');
  isAgainstBot = choice === 'bot';

  initBoard(boardP1);
  initBoard(boardP2);

  placeShips(boardP1);
  placeShips(boardP2);

  console.log('Player 1 turn to shoot!');
  while (player1ShipsRemaining > 0 && player2ShipsRemaining > 0) {
    player2ShipsRemaining = takeTurn(boardP2, 'Player 1', player2ShipsRemaining, player1ShotsTaken);
    if (player2ShipsRemaining === 0) {
      console.log('Player 1 wins!');
      break;
    }
    if (!isAgainstBot) {
      player1ShipsRemaining = takeTurn(boardP1, 'Player 2', player1ShipsRemaining, player2ShotsTaken);
      if (player1ShipsRemaining === 0) {
        console.log('Player 2 wins!');
        break;
      }
    } else {
      let guessRow, guessCol;
      do {
        guessRow = Math.floor(Math.random() * 10);
        guessCol = Math.floor(Math.random() * 10);
      } while (boardP1[guessRow][guessCol] === '+' || boardP1[guessRow][guessCol] === 'X');
      console.log(`Bot shoots: ${guessRow}, ${guessCol}`);
      if (boardP1[guessRow][guessCol] === 'O') {
        console.log('Bot hits!');
        boardP1[guessRow][guessCol] = 'X';
        player1ShipsRemaining--;
      } else {
        console.log('Bot misses!');
        boardP1[guessRow][guessCol] = '+';
      }
      player2ShotsTaken++;
      if (player1ShipsRemaining === 0) {
        console.log('Bot wins!');
      }
    }
  }
  console.log('exit');
}

runGame();
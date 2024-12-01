const ROWS = 6
const COLUMNS = 7
let currentPlayer = 'red'
const board = []
const boardDiv = document.getElementById('board')
const winnerMessage = document.getElementById('winnerMessage')

// Create the game board
function initializeBoard() {
  boardDiv.innerHTML = ''
  for (let row = 0; row < ROWS; row++) {
    board[row] = []
    for (let col = 0; col < COLUMNS; col++) {
      board[row][col] = null
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.dataset.row = row
      cell.dataset.col = col
      boardDiv.appendChild(cell)
    }
  }
  boardDiv.addEventListener('click', handleMove)
}

function handleMove(event) {
  const col = parseInt(event.target.dataset.col)
  if (!isNaN(col)) {
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!board[row][col]) {
        board[row][col] = currentPlayer
        const cell = boardDiv.children[row * COLUMNS + col]
        cell.classList.add(currentPlayer)
        if (checkWin(row, col)) {
          winnerMessage.textContent = `${currentPlayer.toUpperCase()} Wins!`
          boardDiv.removeEventListener('click', handleMove)
        } else {
          currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red'
        }
        break
      }
    }
  }
}

// Check for a win condition
function checkWin(row, col) {
  return (
    checkDirection(row, col, 1, 0) || // Horizontal
    checkDirection(row, col, 0, 1) || // Vertical
    checkDirection(row, col, 1, 1) || // Diagonal /
    checkDirection(row, col, 1, -1) // Diagonal \
  )
}

function checkDirection(row, col, rowDelta, colDelta) {
  let count = 1
  count += countInDirection(row, col, rowDelta, colDelta)
  count += countInDirection(row, col, -rowDelta, -colDelta)
  return count >= 4
}

function countInDirection(row, col, rowDelta, colDelta) {
  let count = 0
  let r = row + rowDelta
  let c = col + colDelta
  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLUMNS &&
    board[r][c] === currentPlayer
  ) {
    count++
    r += rowDelta
    c += colDelta
  }
  return count
}

// Initialize the game
initializeBoard()

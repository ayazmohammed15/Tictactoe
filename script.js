let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // X is the human player, O is the computer
let gameActive = true;
let againstComputer = false;

const statusDisplay = document.getElementById('status');
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// Function to handle click events on the game board
function handleClick(index) {
    if (board[index] !== '' || !gameActive) return; // If the cell is already filled or game over, don't proceed.

    board[index] = currentPlayer; // Set current player's move
    document.getElementById(`cell-${index}`).innerText = currentPlayer;
    checkWinner(); // Check if the player won after this move

    if (gameActive) {
        if (againstComputer && currentPlayer === 'X') {
            setTimeout(computerMove, 500); // Delay the computer move by 500ms
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch turns
            updateStatus();
        }
    }
}

// Function to check if a player has won
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        if (currentPlayer === 'X') {
            statusDisplay.innerText = 'You Won!';
        } else {
            statusDisplay.innerText = 'You Lost!';
        }
        return;
    }

    if (!board.includes('')) {
        gameActive = false;
        statusDisplay.innerText = "It's a draw!";
        return;
    }
}

// Function for computer's move
function computerMove() {
    let availableCells = board.map((value, index) => value === '' ? index : null).filter(index => index !== null);
    if (availableCells.length === 0) return; // No moves available

    let randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    board[randomCell] = 'O';
    document.getElementById(`cell-${randomCell}`).innerText = 'O';

    checkWinner(); // Check if the computer won after its move

    if (gameActive) {
        currentPlayer = 'X'; // Switch back to player
        updateStatus();
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    againstComputer = false;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    statusDisplay.innerText = 'Player X’s turn';
}

// Function to start a game against the computer
function startComputer() {
    resetGame();
    againstComputer = true;
}

// Function to update the game status message
function updateStatus() {
    if (gameActive) {
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    }
}

// Initialize the game
resetGame();

const cells = document.querySelectorAll('.cell');
const statusDiv = document.querySelector('.status');
const restartBtn = document.querySelector('.restart-btn');
let currentPlayer = 'Jose';
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        statusDiv.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDiv.textContent = 'It\'s a tie!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'Jose' ? 'Ina' : 'Jose';
    statusDiv.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    currentPlayer = 'Jose';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    statusDiv.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

statusDiv.textContent = `It's ${currentPlayer}'s turn`;


const mainbox = document.querySelector('.mainbox');
const sbox = document.querySelectorAll('.sbox');
const message = document.querySelector('.msg');
const restartbtn = document.querySelector('.button');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill(null);

const winningPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6], 
];

function handleSboxClick(e) {
    const sbox = e.target;
    const index = parseInt(sbox.id) - 1; 

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    sbox.textContent = currentPlayer;

    if (checkWinner()) {
        highlightWinningLine();
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell)) {
        message.textContent = "It's a tie!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    return winningPatterns.find(pattern =>
        pattern.every(index => gameState[index] === currentPlayer)
    );
}

function highlightWinningLine() {
    const winningPattern = checkWinner();
    if (winningPattern) {
        winningPattern.forEach(index => {
            sbox[index].classList.add('highlight');
        });
    }
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState.fill(null);
    sbox.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('highlight');
    });
    message.textContent = "Player X's Turn";
}

sbox.forEach(cell => cell.addEventListener('click', handleSboxClick));
restartbtn.addEventListener('click', restartGame);

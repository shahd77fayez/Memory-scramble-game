const ALL_ICONS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝', '🥑', '🌽', '🥕', '🥦', '🍄', '🥜', '🌰', '🍞', '🧀', '🍗', '🍔', '🍟'];
let timerInterval;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairsCount = 0;
let totalPairs = 0;
document.getElementById('start-btn').addEventListener('click', async function() {
    const nRows = parseInt(document.getElementById('rows').value);
    const nColumns = parseInt(document.getElementById('cols').value);
    const timeout = parseInt(document.getElementById('timeout').value);

    if (isNaN(nRows) || isNaN(nColumns) || isNaN(timeout)) {
        alert("Please enter valid numbers for rows, columns, and timeout.");
        return;
    }

    const boardSize = nRows * nColumns;

    if (boardSize % 2 !== 0) {
        alert("The total board size (nRows * nColumns) must be an EVEN number!");
        return;
    }

    clearInterval(timerInterval);
    matchedPairsCount = 0;
    totalPairs = boardSize / 2;
    resetBoardState();

    generateBoard(nRows, nColumns, boardSize);

    try {
        await startGameTimer(timeout);
        
        setTimeout(() => alert("Congratulations! You Won!"), 300);
    } catch (error) {
        if (error === "timeout") {
            setTimeout(() => alert("Game Over! Time's up."), 300);
            lockBoard = true;
        }
    }
});
function startGameTimer(seconds) {
    return new Promise((resolve, reject) => {
        let timeLeft = seconds;
        const timerDisplay = document.getElementById('timer');
        timerDisplay.innerText = `Time Left: ${timeLeft}s`;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.innerText = `Time Left: ${timeLeft}s`;

            if (matchedPairsCount === totalPairs) {
                clearInterval(timerInterval);
                resolve("win"); 
            } 
            else if (timeLeft <= 0) {
                clearInterval(timerInterval);
                reject("timeout"); 
            }
        }, 1000);
    });
}
function generateBoard(nRows, nCols, boardSize) {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; 
    board.style.gridTemplateColumns = `repeat(${nCols}, 80px)`;

    const pairsCount = boardSize / 2; 
    
    if (pairsCount > ALL_ICONS.length) {
        alert("Board is too large! Max board size is " + (ALL_ICONS.length * 2));
        return;
    }

    const selectedIcons = ALL_ICONS.slice(0, pairsCount);
    let gameCards = [...selectedIcons, ...selectedIcons]; 

    gameCards.sort(() => Math.random() - 0.5);

    gameCards.forEach((icon) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon; 
        card.textContent = icon; 
        
        card.addEventListener('click', flipCard);
        
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}
function checkForMatch() {
    let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    matchedPairsCount++;
    resetBoardState();
}
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoardState();
    }, 1000);
}
function resetBoardState() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

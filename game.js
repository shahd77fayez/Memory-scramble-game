const ALL_ICONS = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝', '🥑', '🌽', '🥕', '🥦', '🍄', '🥜', '🌰', '🍞', '🧀', '🍗', '🍔', '🍟'];

document.getElementById('start-btn').addEventListener('click', initializeGame);

function initializeGame() {
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

    generateBoard(nRows, nColumns, boardSize);
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

    gameCards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon; 
        card.textContent = icon; 
        board.appendChild(card);
    });
}
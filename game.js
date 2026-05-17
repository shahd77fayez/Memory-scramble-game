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
    
    console.log(`Game Started! Board Size: ${boardSize} (${nRows}x${nColumns}), Timeout: ${timeout}s`);

}
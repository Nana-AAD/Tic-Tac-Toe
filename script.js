console.log('Script loaded!');
document.addEventListener('DOMContentLoaded', function(){
    // Get all cells on the board
    const cells = document.querySelectorAll('.cell')

    //Track current player
    let currentPlayer = 'X';

    //Track game over state
    let gameOver = false;

    // Function to handle cell click
    const handleCellClick = function() {
        if (!gameOver && this.textContent === ''){
            this.textContent = currentPlayer;
            if(checkWinner()){
                gameOver = true;
                displayMessage(`${currentPlayer} wins!`);
            } else if (isBoardFull()){
                gameOver = true;
                displayMessage("It's a tie!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                displayMessage(`Current player: ${currentPlayer}`);
            }
        }
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));

    const checkWinner = function() {
        const winningCombos = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,6], [2,4,6]// Diagonals
        ];
        return winningCombos.some(combo => {
            return combo.every(index => cells[index].textContent === currentPlayer);
        });
    };

    // Function to check if the board is full
    const isBoardFull = function() {
        return Array.from(cells).every(cell => cell.textContent !== '');
    };

    // Fucntion to display message
    const displayMessage = function(message){
        document.getElementById('message').textContent = message;
    };

    //Function to reset the game
    const resetGame = function() {
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameOver = false;
        displayMessage(`Current player: ${currentPlayer}`);
    };

    //Reset game when the reset button is clicked
    document.getElementById('reset-button').addEventListener('click', resetGame);

    // Display initial message
    displayMessage(`Current player: ${currentPlayer}`)
});
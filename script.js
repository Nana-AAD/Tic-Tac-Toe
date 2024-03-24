// Create an IIFE(Immediately Invoked Function Expression)
const TicTacToeGame = (function(){

    // Factory function for creating players
    const Player = (name, marker) => {
        return {name, marker}
    }


// Factory function for creating game board 
const Gameboard = (() => {
    let board = ['', '','','','','','','',''] // Represents 3x3 board
    const getBoard = () => board;
    const updateBoard = (index, marker) => {
        if (board[index] === ''){
            board[index] = marker;
            return true;// Update succesful
        } else{
            return false;// Cell already occupied
        }
    };
    const resetBoard = () => {
        board = ['','','','','','','','','',]
    };

    // Check for winning combinations
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],// Rows
        [0,3,6], [1,4,7], [2,5,8],// Columns
        [0,4,8], [2,4,6]// Diagonals
    ];
    
    const checkWinner = (marker) => {
        return winningCombos.some(combo => {
            return combo.every(index => board[index] === marker);
        });
    };
    
    const isBoardFull = () => {
        return board.every(cell => cell !== '');
    };

    return { getBoard, updateBoard, resetBoard, checkWinner, isBoardFull};
})();


const Game = (() => {
    let currentPlayer;
    let gameOver = false;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2: player1;
    };

    const startGame = () => {
        player1 = Player(prompt("Enter Player 1 name"), "X");
        player2 = Player(prompt("Enter Player 2 name"), "O");
        currentPlayer = player1;
        gameOver = false;
        Gameboard.resetBoard();
        DisplayController.clearBoard();
        DisplayController.updateDisplay(`Current player: ${currentPlayer.name}`);
    };

    const playTurn = (index) => {
        if (!gameOver && Gameboard.updateBoard(index, currentPlayer.marker)){
            DisplayController.updateCell(index, currentPlayer.marker);
            if(Gameboard.checkWinner(currentPlayer.marker)){
                DisplayController.updateDisplay(`${currentPlayer.name} wins!`);
                gameOver = true;
            } else if (Gameboard.isBoardFull()){
                DisplayController.updateDisplay("It's a tie!");
                gameOver = true;
            } else {
                switchPlayer();
                DisplayController.updateDisplay(`Current player: ${currentPlayer.name}`);
            }
        }
    };

    return {startGame, playTurn};
})();

// Module for handling display logic
const DisplayController = (() => {
    const boardCells = document.querySelectorAll('.cell')
    
    const clearBoard = () => {
        boardCells.forEach(cell => cell.textContent = '');
    };

    const updateCell = (index, marker) => {
        boardCells[index].textContent = marker;
    };

    const updateDisplay = (message) => {
        document.getElementById('message').textContent = message;
    };

    const initializeBoard = () => {
        boardCells.forEach((cell, index) => {
            cell.addEventListener('click', () =>{
                if(cell.textContent === '' && !Game.gameOver){
                    Game.playTurn(index);
                }
            });
        });
    };

    return { clearBoard, updateCell, updateDisplay, initializeBoard};
})();

// Initialize the game 
DisplayController.initializeBoard();

return{ Game} ;
})();


TicTacToeGame.Game.startGame();
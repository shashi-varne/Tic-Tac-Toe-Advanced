const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]')
const WINNING_COMBINATION = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6 ]
]
let circleTurn;
const board = document.querySelector('.board')
const winningText = document.querySelector('[data-winning-message-text]')
const winning = document.querySelector('.winning-message')
const restartButton = document.getElementById('restartButton')

startGame();

restartButton.addEventListener('click', startGame)
function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winning.classList.remove('show')
}


function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    //place mark
    placeMark(cell, currentClass)
    //check for win
    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns()
        setBoardHoverClass()
    }
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
        return;
    }
    board.classList.add(X_CLASS)
}

function checkWin(currentClass){
    return WINNING_COMBINATION.some(combination => {
        return  combination.every((val) => {
            return cellElements[val].classList.contains(currentClass);
        })
    })
}

function endGame(draw){
    if(draw){
        winningText.textContent = 'Draw!'
    }else{
        winningText.textContent = `${circleTurn ?"O's" : "X's" } Wins!`
    }
    winning.classList.add('show'); 
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
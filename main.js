let GameBoard = ['','','','','','','','','']
let x = document.querySelector('.x')
let o = document.querySelector('.o')
let player1;
let computerChoice;
let player;
let p = document.querySelector('p')
let modal = document.querySelector('.modal')
let btn = document.querySelector('button')
let next;
let round = 0;
let choice;
btn.addEventListener('click', restart)

let choices = [x,o]
choices.forEach((e) => e.addEventListener('click', choiceSelected))


function choiceSelected(e) {
    player1 = e.target.textContent
    next = true
    modal.style.display = 'none'
}

const winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

let board = document.querySelectorAll('.grid-content')

const boardArr = Array.from(board)



boardArr.forEach((x) => {
    x.addEventListener('click', add)
})

function restart() {
    GameBoard = ['','','','','','','','','']
    btn.classList.add('hide')
    p.textContent = ''
    boardArr.forEach((x) => {
        x.style.background = ''
        x.textContent = ''
        x.style.cursor = 'default'
        x.addEventListener('click', add)
    })
    updateGameBoard()
}

function sign() {
    if(player1.toLowerCase() === 'x') {
        computerChoice = 'o'
    }else {
        computerChoice = 'x'
    }

    if(next) {
        player = player1
        next = !next
    }else {
        player = computerChoice
        next = !next
    }
}

function checkDraw() {
    if(boardArr.every(x => x.textContent != '' && p.textContent === '')){
        p.innerText = 'Its a draw'
        btn.classList.remove('hide')
    }
}

function choicese() {
    choice = Math.floor(Math.random() * 9)
    let indexesOfSpace = getAllIndexes(GameBoard, '')
    if(indexesOfSpace.length <= 1){
        choice = indexesOfSpace[0]
    }else if(GameBoard[choice] != ''){
        choicese()
    }
}

function computer() {
    sign()
    choicese()
    GameBoard[choice] = player
    updateGameBoard()
    if(round >= 3){
        checkWin()
        checkDraw()
    }
}

function playerRound(e) {
    sign()
    GameBoard[e.target.getAttribute('data-index')] = player
    updateGameBoard()
    if(round >= 3){
        checkWin()
        checkDraw()
    }
}

function add(e) {
    round++
    if(GameBoard[e.target.getAttribute('data-index')] !='' ){
        boardArr[e.target.getAttribute('data-index')].style.cursor = 'not-allowed'
    }else{
        playerRound(e)
        computer()
    }
}


function updateGameBoard() {
    boardArr.forEach((x, i) => {
        if(x.textContent != '') {
            return
        }
        x.textContent = GameBoard[i]
    })
}


// Getting array of indexes

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

// Check for win using Every


function checkWin(){
    let indexesOfX = getAllIndexes(GameBoard, "x")
    let indexesOfO = getAllIndexes(GameBoard, "o")
    let checkForX;
    let checkForO;
    for (let i = 0; i < winArr.length; i++) {
        let formula = winArr[i]
        checkForX = formula.every((x) => indexesOfX.includes(x))
        checkForO = formula.every((x) => indexesOfO.includes(x))
        if(checkForX) {
            formula.forEach((x) => {
                boardArr[x].style.background = 'grey'
                }
            )
            p.innerText = `x win`
            boardArr.forEach((x) => {
                x.removeEventListener('click', add)
                btn.classList.remove('hide')
            })
            break
        }
        if(checkForO) {
            formula.forEach((x) => {
                boardArr[x].style.background = 'grey'
                }
            )
            p.innerText = `o win`
            boardArr.forEach((x) => {
                x.removeEventListener('click', add)
                btn.classList.remove('hide')
            })
            break
        }
    }
}
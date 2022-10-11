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
let turn = 0;
let round = 1;
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
    round = 0
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
    medium()
    GameBoard[choice] = player
    updateGameBoard()
    if(turn >= 3){
        checkWin()
        checkDraw()
    }
    
    round++
}

function playerRound(e) {
    sign()
    GameBoard[e.target.getAttribute('data-index')] = player
    updateGameBoard()
    if(turn >= 3){
        checkWin()
        checkDraw()
    }
}

function add(e) {
    turn++
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

// trying to add difficulty level

// function medium() {
//     let indexesOfX = getAllIndexes(GameBoard, "x")
//     let indexesOfO = getAllIndexes(GameBoard, "o")
//     for(let i = 0; i < winArr.length;i++) {
//         let formula = winArr[i]
//         if(formula.some((x) => indexesOfX.includes(x))) {
//             computerMedium()
//             break
//         }
//     }
// }

// function computerMedium() {
//     choice = Math.floor(Math.random() * 3)
//     if(GameBoard[choice] != ''){
//         computerMedium()
//     }
// }


// medium level checks if player has two indexes out of three in an winArr then plays in the third arr else it calls choicese()
function medium() {
    let indexesOfPlayer1 = getAllIndexes(GameBoard, player1.toLowerCase())
    console.log(indexesOfPlayer1)
    if(round > 2){
        for(let i = 0; i < winArr.length; i++) {
            let formula = winArr[i]
            for(let i = 0; i < formula.length; i++){
                if((indexesOfPlayer1.includes(formula[0]) && indexesOfPlayer1.includes(formula[1]))
                || 
                 (indexesOfPlayer1.includes(formula[0]) && indexesOfPlayer1.includes(formula[2]))
                || 
                  (indexesOfPlayer1.includes(formula[1]) && indexesOfPlayer1.includes(formula[2]))){
                    if((indexesOfPlayer1.includes(formula[0]) && indexesOfPlayer1.includes(formula[1]))){
                        choice = formula[2]
                        console.log(`this is the computer's decision ${choice}`)
                        if(GameBoard[choice] != ''){
                            continue
                        }
                    }else if((indexesOfPlayer1.includes(formula[0]) && indexesOfPlayer1.includes(formula[2]))){
                        choice = formula[1]
                        console.log(`this is the computer's decision ${choice}`)
                        if(GameBoard[choice] != ''){
                            continue
                        }
                    }else {
                        choice = formula[0]
                        console.log(`this is the computer's decision ${choice}`)
                        if(GameBoard[choice] != ''){
                            continue
                        }
                    }
                }else {
                    continue
                }
            }
        }
    }else{
        choicese()
    }
}
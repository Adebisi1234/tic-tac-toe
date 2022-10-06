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
    [2,3,6],
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

// function checkWin() {
//     let X = getAllIndexes(GameBoard, "x")
//     let o = getAllIndexes(GameBoard, "o")
//     for(let i = 0; i < winArr.length; i++) {
//         if(X.toString().includes(winArr[i].toString())){
//             p.innerText = 'X win'
//             boardArr.forEach((x) => {
//                 x.removeEventListener('click', add)
//                 btn.classList.remove('hide')
//             })
//         }else if((o.toString().includes(winArr[i].toString()))) {
//             p.innerText = 'O win'
//             boardArr.forEach((x) => {
//                 x.removeEventListener('click', add)
//                 btn.classList.remove('hide')
//             })
//         }
//     }
// }

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

function add(e) {
    if(GameBoard[e.target.getAttribute('data-index')] !='' ){
        boardArr[e.target.getAttribute('data-index')].style.cursor = 'not-allowed'
    }else {
        sign()
        if(player == computerChoice) {
            choicese()
            GameBoard[choice] = player
            updateGameBoard()
        }else {
            GameBoard[e.target.getAttribute('data-index')] = player
            checkWinForX()
            checkWinForO()
            sign()
            choicese()
            GameBoard[choice] = player
            updateGameBoard()
        }
        checkWinForX()
        checkWinForO()
        updateGameBoard()
        checkDraw()
        updateGameBoard()
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
let test2;
function checkWinForX() {
    let indexesOfX = getAllIndexes(GameBoard, "x")
    let test;
    for (let i = 0; i < winArr.length; i++) {
        for(let j = 0; j < winArr[i].length; j++) {
            test = indexesOfX.includes(winArr[i][j])
            if(test === false) {
                break
            }else{
                test2 = winArr[i]
            }
        }
        if(test) {
            test2.forEach((x) => {
                boardArr[x].style.background = 'grey'
            })
            p.innerText = `x win`
            boardArr.forEach((x) => {
                x.removeEventListener('click', add)
                btn.classList.remove('hide')
            })
        }
    
    }
    
}

function checkWinForO() {
    let indexesOfO = getAllIndexes(GameBoard, "o")
    let test;
    for (let i = 0; i < winArr.length; i++) {
        for(let j = 0; j < winArr[i].length; j++) {
            test = indexesOfO.includes(winArr[i][j])
            if(test === false) {
                break
            }
        }
        if(test) {
            p.innerText = `o win`
            boardArr.forEach((x) => {
                x.removeEventListener('click', add)
                btn.classList.remove('hide')
            })
        }
    
    }
    
}
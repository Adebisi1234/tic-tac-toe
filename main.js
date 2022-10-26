// Global Variables
const GameBoard = ['','','','','','','','','']
const x = document.querySelector('.x')
const o = document.querySelector('.o')
let player1;
let computerChoice;
let player;
const defaultOption = document.querySelector('#default')
const p = document.querySelector('p')
const modal = document.querySelector('.modal')
const btn = document.querySelector('button')
let next;
const board = document.querySelectorAll('.grid-content')
const boardArr = Array.from(board)
let turn = 0;
const fixed = document.querySelector('.fixed')
let round = 1;
let choice;
const select = document.querySelector('select')
const diff = document.querySelector('#difficulty')
btn.addEventListener('click', restart)
const choices = [x,o]

// Choosing x or o
choices.forEach((e) => e.addEventListener('click', selected))

function selected(e) {
    player1 = e.target.textContent
    fixed.style.display = 'none'
    next = true
    modal.style.display = 'none'

    diff.style.display = 'flex'
}

select.addEventListener('input', () => {
    if(!(select.value === 'default')){
        diff.style.display = 'none'
        boardArr.forEach((x) => {
            x.style.pointerEvents = 'all'
        })
    }else {
        return;
    }
    
})

// WINNING COMBINATIONS
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




// Adding choice to board
boardArr.forEach((x) => {
    x.addEventListener('click', add)
})

function add(e) {
    turn++
    if(GameBoard[e.target.getAttribute('data-index')] !='' ){
        boardArr[e.target.getAttribute('data-index')].style.cursor = 'not-allowed'
    }else{
        playerRound(e)
        if(p.textContent === ''){
            computer()    
        }
        
    }
}


// Restart Function
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
    fixed.style.display = 'flex'
    modal.style.display = 'flex'
    diff.style.display = 'none'
    select.value = 'default'
    defaultOption.setAttribute('selected', 'selected')
    console.log(defaultOption.attributes)
    updateGameBoard()
}


// Changing players
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

// Check for draw
function checkDraw() {
    if(boardArr.every(x => x.textContent != '' && p.textContent === '')){
        p.innerText = 'Its a draw'
        btn.classList.remove('hide')
    }
}

// Computer Easy mode function
function easy() {
    choice = Math.floor(Math.random() * 9)
    let indexesOfSpace = getAllIndexes(GameBoard, '')
    if(indexesOfSpace.length <= 1){
        choice = indexesOfSpace[0]
    }else if(GameBoard[choice] != ''){
        // Recursion
        easy()
    }
}


// Computer choice function
function computer() {
    sign()
    if(select.value === 'easy'){
        easy()
    }else {
        medium()        
    }
    GameBoard[choice] = player
    updateGameBoard()
    if(turn >= 3){
        checkWin()
        checkDraw()
    }
    
    round++
}

// Game main function
function playerRound(e) {
    sign()
    GameBoard[e.target.getAttribute('data-index')] = player
    updateGameBoard()
    if(turn >= 3){
        checkWin()
        checkDraw()
    }
}



// Updating the DOM
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


// medium level checks if player has two indexes out of three in an winArr then plays in the third index else it calls easy()

function medium() {
    let indexesOfPlayer1 = getAllIndexes(GameBoard, player1.toLowerCase())
    let check;
    for(let i = 0; i < winArr.length; i++){
        formula = winArr[i]
        if(!((indexesOfPlayer1.includes(formula[0]) && indexesOfPlayer1.includes(formula[1]))
        || 
        (indexesOfPlayer1.includes(formula[0]) && indexesOfPlayer1.includes(formula[2]))
        || 
        (indexesOfPlayer1.includes(formula[1]) && indexesOfPlayer1.includes(formula[2])))){
            check = false
            continue
        }else{
            check = true            
            break
        }
    }
    if(!check){
        easy()
        return
    }else{
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
                        if(GameBoard[choice] != ''){                            
                            easy()
                            continue
                        }
                    }else if((indexesOfPlayer1.includes(formula[0]) && indexesOfPlayer1.includes(formula[2]))){
                        choice = formula[1]                        
                        if(GameBoard[choice] != ''){                            
                            easy()
                            continue
                        }
                    }else {
                        choice = formula[0]                        
                        if(GameBoard[choice] != ''){                            
                            easy()
                        }
                    }
                }else {
                    continue
                }
            }
        }
    } 
}

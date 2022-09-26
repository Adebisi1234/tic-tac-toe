let GameBoard = ['','','','','','','','','']

let player1 = true
let player;
let p = document.querySelector('p')
let btn = document.querySelector('button')
btn.addEventListener('click', restart)

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
        x.textContent = ''
        x.addEventListener('click', add)
    })
    updateGameBoard()
}

function sign() {
    if(player1) {
        player = 'x'
        player1 = !player1
    }else {
        player = 'o'
        player1 = !player1
    }
}

function checkWin() {
    let X = getAllIndexes(GameBoard, "x")
    let o = getAllIndexes(GameBoard, "o")
    for(let i = 0; i < winArr.length; i++) {
        if(X.toString().includes(winArr[i].toString())){
            p.innerText = 'X win'
            boardArr.forEach((x) => {
                x.removeEventListener('click', add)
                btn.classList.remove('hide')
            })
        }else if((o.toString().includes(winArr[i].toString()))) {
            p.innerText = 'O win'
            boardArr.forEach((x) => {
                x.removeEventListener('click', add)
                btn.classList.remove('hide')
            })
        }
    }
}

function add(e) {
    sign()
    GameBoard[e.target.getAttribute('data-index')] = player
    checkWin()
    updateGameBoard()    
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

// var indexes = getAllIndexes(GameBoard, "x");




// PsuedoCode

// if x|| o indexes ==  win index[i] console.log yes

let a = [1,2,3]
let b = [1,2,3]
console.log(a == b.toString())

// Will be trying out toString


const GameBoard = ['','','','','','','','','']

let player1 = true
let player;


const winArr = [
    [0,1,2],
    [3,4,5],
    [6,7,8]
]

let board = document.querySelectorAll('.grid-content')

const boardArr = Array.from(board)

boardArr.forEach((x) => {
    x.addEventListener('click', add)
})

function sign() {
    if(player1) {
        player = 'x'
        player1 = !player1
    }else {
        player = 'o'
        player1 = !player1
    }
}

function add(e) {
    sign()
    GameBoard[e.target.getAttribute('data-index')] = player

    let index = getAllIndexes(GameBoard, "x")
    if(winArr[0].toString() == index.toString()){
        console.log('fuck')
    }else {
        console.log(index.toString())
        console.log(winArr[0].toString())
    }

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


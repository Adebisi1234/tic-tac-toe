const GameBoard = ['','','','','','','','','']

let player1 = true
let player



let board = document.querySelectorAll('.grid-content')

const boardArr = Array.from(board)
console.log(boardArr[0].getAttribute('data-index'))

boardArr.forEach((x) => {
    x.addEventListener('click', add)
})

function add(e) {
    if(player1) {
        player = 'x'
    }else {
        player = 'o'
    }
    GameBoard[e.target.getAttribute('data-index')] = player
    console.log(GameBoard)
    updateGameBoard()
    winArr.forEach((x) => {
        if(x == getAllIndexes(GameBoard, 'x')){
            console.log('yes')
        }
    })
    player1 = !player1
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


const winArr = [[0,1,2]]



// PsuedoCode

// if x|| o indexes ==  win index[i] console.log yes
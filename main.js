const GameBoard = ['','','','','','','','','']

let player1 = true
let player



let board = document.querySelectorAll('.grid-content')

const boardArr = Array.from(board)

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

    updateGameBoard()
    winArr.forEach((x) => {
        if(x.every(item => getAllIndexes(GameBoard, "x").includes(item)) && getAllIndexes(GameBoard, "x").every(item => x.includes(item))){
            console.log('yes')
            document.body.append('you win')
        }else {
            console.log('no')
            console.log(getAllIndexes(GameBoard, 'x'))
            console.log(x)
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

let a = [1,2,3]
let b = [1,2,3]

// if(){
//     console.log('fuck')
// }
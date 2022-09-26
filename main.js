const GameBoard = ['','','','','','','','','']

let board = document.querySelectorAll('.grid-content')

const boardArr = Array.from(board)
console.log(boardArr[0].getAttribute('data-index'))

boardArr.forEach((x) => {
    x.addEventListener('click', add)
})

function add(e) {
    GameBoard[e.target.getAttribute('data-index')] = 'x'
    console.log(GameBoard)
    updateGameBoard()

}

function updateGameBoard() {
    boardArr.forEach((x, i) => {
        x.textContent = GameBoard[i]
    })
}
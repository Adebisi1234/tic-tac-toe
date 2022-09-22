let isX = true
let playerChoice


let gridItem = document.querySelectorAll('.grid-content')
let gridArr = Array.from(gridItem)

gridArr.forEach((x) => x.addEventListener('click', player))

function player(e) {
    if(isX) {
        playerChoice = 'x'
        isX = false
    }else {
        playerChoice = 'o'
        isX = true
    }
    e.target.textContent = playerChoice
    console.log(playerChoice)
}
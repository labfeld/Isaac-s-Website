let Game = document.querySelector('canvas')

let ctx = Game.getContext("2d")

let gridSize = 69

const air = 0
const block = 1

let world = [
    [air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],
    [air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],
    [air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],
    [air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],
    [air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],
    [air, air, air, block, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],
    [air, air, air, block, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],
    [air, air, air, block, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air, air,],

    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],
    [block, block, block, block, block, air, air, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block, block,],

]

let SteveDir = 0
let SteveX = 0
let SteveY = 0
let Yvel = 0

let coins = [{ x: 3, y: 3 }, { x: 10, y: 1 }]

function drawCoin(coin) {
    ctx.fillStyle = "gold"
    ctx.fillRect(coin.x * gridSize, coin.y* gridSize, 10, 10)
}

function drawSteve() {
    ctx.fillStyle = 'red'
    ctx.fillRect(SteveX * gridSize, SteveY * gridSize, gridSize, gridSize)
}

function drawSquare(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize)
}

function drawWorld() {
    for (let y = 0; y < world.length; y++) {
        for (let x = 0; x < world[y].length; x++) {
            if (world[y][x] === block) {
                drawSquare(x, y, 'green')
            }
        }
    }
}

function runGame() {
    ctx.clearRect(0, 0, 1500, 900)

    SteveY += Yvel
    if (
        world[Math.floor(SteveY)][Math.ceil(SteveX)] === block ||
        world[Math.floor(SteveY)][Math.floor(SteveX)] === block

    ) {
        Yvel = 0
    } else {
        Yvel += 0.1
    }
    if (world[Math.ceil(SteveY)][Math.round(SteveX)] === block) {
        // Yvel=-0.1
        SteveY = Math.round(SteveY)
    }
    Yvel = Math.max(Math.min(Yvel, 0.3), -0.3)


    if (world[Math.round(SteveY)][Math.floor(SteveX)] === block
        || world[Math.round(SteveY)][Math.ceil(SteveX)] === block) {
        SteveX = Math.round(SteveX)
        console.log("hit wall")
    } else {

        SteveX += 0.1 * SteveDir
    }



    drawWorld()
    drawSteve()
    coins.forEach(coin=> drawCoin(coin))
    requestAnimationFrame(runGame)
}


document.addEventListener('keydown', (event) => {
    if (event.key == 'a') { SteveDir = -1 }
    if (event.key == 'd') { SteveDir = 1 }
    if (event.key == ' ') { Yvel = -1 }
})

document.addEventListener('keyup', (event) => {
    if (event.key == 'a') { SteveDir = 0 }
    if (event.key == 'd') { SteveDir = 0 }
})

runGame()
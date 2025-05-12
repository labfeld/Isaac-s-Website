let Game = document.querySelector('canvas')

let ctx = Game.getContext("2d")

let gridSize = 69

const air = 0
const block = 1

let world = [
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    [air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,air, air, air, air, air, air,],
    
    [block, block, block, block, block, air,air, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],
    [block, block, block, block, block, air,air,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,block, block, block, block, block, block,],

]

let SteveX=0
let SteveY=0

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
    ctx.clearRect(0,0,1500,900)

    SteveY+=1
    if(world[Math.floor(SteveY)][Math.round(SteveX)] === block) {
        SteveY-=1
    }

drawWorld()
drawSteve()
requestAnimationFrame(runGame)
}


document.addEventListener('keydown', (event)=>{
    if (event.key =='a') {SteveX-=0.1}
    if (event.key =='d') {SteveX+=0.1}
})

runGame()
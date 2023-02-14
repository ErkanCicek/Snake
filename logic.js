var snake = [{x: 300, y: 300},{x: 350, y: 300},{x: 400, y: 300}]
var apple = {x: 0, y: 0}

var xVel = 0
var yVel = 0

var points = 0

var lastPressedKey

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

function draw() {
    ctx.clearRect(0, 0, 700, 700)
    ctx.fillStyle = "blue"
    for(var i = 0; i < snake.length; i++){
        ctx.fillRect(snake[i].x, snake[i].y, 50, 50)
    }
    createGrid()
    drawApple()
}

function update() {
    eatApple()
    selfCollisionDetection()
    wallCollisionDetection()
    snakeMovement()
}

function render(){
    update()
    draw()
}

function gameLoop(){
    setInterval(render, 1000/14)
}

//start
window.onload = () => {
    gameLoop()
    generateApple()
}

document.addEventListener("keydown", (e) => {
    switch(e.key){
        case "ArrowDown":
            if(lastPressedKey == "ArrowUp"){
                break
            }else{
                xVel = 0
                yVel = 50
                lastPressedKey = e.key
            }
            break
        case "ArrowUp":
            if(lastPressedKey == "ArrowDown"){
                break
            }else{
                xVel = 0
                yVel = -50
                lastPressedKey = e.key
            }
            break
        case "ArrowLeft":
            if(lastPressedKey == "ArrowRight"){
                break
            }else{
                xVel = -50
                yVel = 0
                lastPressedKey = e.key
            }
            break
        case "ArrowRight":
            if(lastPressedKey == "ArrowLeft"){
                break
            }else{
                xVel = 50
                yVel = 0
                lastPressedKey = e.key
            }
            break
    }
})


//Helper
function createGrid(){
    ctx.strokeStyle = "red";
    
    for(var i = 50;i < 700; i += 50){
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(700, i)
    
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 700)
        ctx.stroke()
    }
}

function wallCollisionDetection(){
    leftWallDetection()
    rightWallDetection()
    topWallDetection()
    bottomWallDetection()
}

function leftWallDetection(){
    if(snake[0].x == -50){
        xVel = 0
        window.location.reload()
    }
}

function rightWallDetection(){
    if(snake[0].x == 700){
        xVel = 0
        window.location.reload()
    }
}

function topWallDetection(){
    if(snake[0].y == -50){
        yVel = 0
        window.location.reload()
    }
}

function bottomWallDetection(){
    if (snake[0].y == 700) {
        yVel = 0
        window.location.reload()
    }
}

function snakeMovement(){
    for(var i = snake.length - 1; i > 0; i--){
        snake[i].x = snake[i-1].x
        snake[i].y = snake[i-1].y
    }
    snake[0].x += xVel
    snake[0].y += yVel
}

function generateApple(){
    var x, y

    while(true){
        x = Math.floor(Math.random() * 14)
        y = Math.floor(Math.random() * 14)

        apple.x = x * 50
        apple.y = y * 50

        if(!isAppleOnSnake()){
            break
        }
    }
}

function isAppleOnSnake(){
    for(var i = 0; i < snake.length; i++){
        if(apple.x == snake[i].x && apple.y == snake[i].y){
            return true
        }
    }
    return false
}

function drawApple(){
    ctx.fillStyle = "red"
    ctx.fillRect(apple.x, apple.y, 50,50)
}

function eatApple(){
    if (snake[0].x == apple.x && snake[0].y == apple.y) {
        points++
        growSnake()
        generateApple()
    }
}

function growSnake(){
    snake.push({x: 0, y: 0})
}

function selfCollisionDetection(){
    if(points > 1){
        for(var i = 1; i < snake.length; i++){
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
                window.location.reload()
            }
        }
    }
}


export {points}
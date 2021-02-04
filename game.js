document.addEventListener('DOMContentLoaded', () => {
    const ball = document.querySelector('.ball');
    const display = document.querySelector('.game-container');
    //console.log(display)
    const ground = document.querySelector('.ground');

    let ballLeft = 220;
    let ballBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 400;

    function startGame() {
        ballBottom -= gravity;
        ball.style.bottom = ballBottom + 'px';
        ball.style.left = ballLeft + 'px';
    }
    //startGame();
    let gametimer = setInterval(startGame,20);
    function controls(e) {
        if(e.keyCode === 32) {
            jump()
        }
    }
    function jump() {
        if(ballBottom < 500)
        ballBottom += 50;
        ball.style.bottom = ballBottom + 'px';
    }
    document.addEventListener('keyup',controls)

    function generateObstacle() {
        let randomHeight = Math.random() * 60;
        let obstacleLeft = 500;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        //console.log(obstacle);
        if(!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle'); 
        }   //obstacle class added to div element of obstacle
        display.appendChild(obstacle);
        display.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';
        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            if(obstacleLeft === -60) {
                clearInterval(timer);
                display.removeChild(obstacle)
                display.removeChild(topObstacle)
            }
            if( obstacleLeft > 200 && obstacleLeft < 280 && ballLeft === 220 && (ballBottom < obstacleBottom + 170||ballBottom > obstacleBottom + gap-150)||
                ballBottom === 0) {
                gameOver();
                clearInterval(timer)
            }
        }
        let timer = setInterval(moveObstacle, 20)
       if(!isGameOver) setTimeout(generateObstacle,3000)
    }
    generateObstacle()
    function gameOver() {
        clearInterval(gametimer);
        //console.log("game over")
        isGameOver = true;
        document.removeEventListener('keyup',controls)
    }
})
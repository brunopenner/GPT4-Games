const bird = document.getElementById('bird');
const gameArea = document.getElementById('gameArea');
let birdY = 285, gravity = 3, jump = -60;
let gameInterval, pipeInterval;
let isGameOver = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        birdY += jump;
    }
});

function moveBird() {
    birdY += gravity;
    birdY = Math.min(birdY, gameArea.offsetHeight - bird.offsetHeight);
    bird.style.top = birdY + 'px';

    if (birdY <= 0 || birdY >= gameArea.offsetHeight - bird.offsetHeight) {
        gameOver();
    }
}

function createPipe() {
    let pipe = document.createElement('div');
    let pipeTop = document.createElement('div');
    let pipeHeight = Math.floor(Math.random() * (300 - 100 + 1) + 100);
    let pipeGap = 200;
    let pipeLeft = gameArea.offsetWidth;

    pipe.classList.add('pipe');
    pipeTop.classList.add('pipeTop');

    gameArea.appendChild(pipe);
    gameArea.appendChild(pipeTop);

    pipe.style.height = pipeHeight + 'px';
    pipe.style.left = pipeLeft + 'px';

    pipeTop.style.height = gameArea.offsetHeight - pipeHeight - pipeGap + 'px';
    pipeTop.style.left = pipeLeft + 'px';

    function movePipe() {
        if (isGameOver) return;

        pipeLeft -= 2;
        pipe.style.left = pipeLeft + 'px';
        pipeTop.style.left = pipeLeft + 'px';

        if (pipeLeft <= -50) {
            pipe.remove();
            pipeTop.remove();
        }

        // Basic collision detection
        if (pipeLeft <= bird.offsetLeft + bird.offsetWidth && pipeLeft + pipe.offsetWidth >= bird.offsetLeft &&
            (bird.offsetTop <= pipeTop.offsetHeight || bird.offsetTop + bird.offsetHeight >= pipeTop.offsetHeight + pipeGap)) {
            gameOver();
        }
    }

    let movePipeInterval = setInterval(movePipe, 20);
    if (isGameOver) clearInterval(movePipeInterval);
}

function gameOver() {
    isGameOver = true;
    clearInterval(gameInterval);
    clearInterval(pipeInterval);
    alert('Game Over!');
}

function startGame() {
    if (!isGameOver) {
        gameInterval = setInterval(moveBird, 20);
        pipeInterval = setInterval(createPipe, 1500);
    }
}

startGame();
  
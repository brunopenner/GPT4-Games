document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const bird = document.getElementById('bird');
    const scoreDisplay = document.getElementById('score');
    const gameOverDialog = document.getElementById('gameOverDialog');
    const retryButton = document.getElementById('retryButton');

    let birdY = 200;
    let birdVelocity = 0;
    let gravity = 0.5;
    let gameRunning = false;
    let pipes = [];
    let score = 0;
    let pipeSpacing = 1500;
    let pipeGap = 120;

    function startGame() {
        if (!gameRunning) {
            gameRunning = true;
            gameOverDialog.style.display = 'none';
            bird.style.top = birdY + 'px';
            document.addEventListener('keydown', control);
            updateGame = setInterval(gameLoop, 20);
            generatePipes();
        }
    }

    function control(e) {
        if (e.key === " " && gameRunning) {
            birdVelocity = -6; // Reduced jump strength for finer control
        }
    }

    // Adjust gameLoop or similar functions for landscape
    function gameLoop() {
        birdY += birdVelocity;
        birdVelocity += gravity;
        bird.style.top = `${birdY}px`;

        // Ensure bird doesn't go below the ground
        if (birdY < 0) {
            birdY = 0;
        } else if (birdY > gameArea.offsetHeight - bird.offsetHeight) {
            endGame(); // End game if bird hits the ground
        }

        movePipes();
        checkCollision();
    }

    function generatePipes() {
        if (!gameRunning) return;
        let pipePosition = gameArea.offsetWidth;
        let upperPipeHeight = Math.random() * (gameArea.offsetHeight / 3) + 50;
        let lowerPipeHeight = gameArea.offsetHeight - upperPipeHeight - pipeGap;

        // Adjustments for creating and positioning pipes in landscape
        let upperPipe = createPipe(upperPipeHeight, true, pipePosition);
        let lowerPipe = createPipe(lowerPipeHeight, false, pipePosition);
        pipes.push({ upperPipe, lowerPipe, passed: false });

        setTimeout(generatePipes, pipeSpacing);
    }

    function createPipe(height, isTop, left) {
        const pipe = document.createElement('div');
        pipe.className = 'pipe';
        pipe.style.height = `${height}px`;
        pipe.style.left = `${left}px`;
        if (isTop) {
            pipe.style.top = '0';
        } else {
            pipe.style.bottom = '0';
        }
        gameArea.appendChild(pipe);
        return pipe;
    }

    function movePipes() {
        pipes.forEach(pipe => {
            let currentLeft = parseInt(pipe.upperPipe.style.left, 10);
            if (currentLeft <= -60) { // Pipe is completely out of view, remove it
                gameArea.removeChild(pipe.upperPipe);
                gameArea.removeChild(pipe.lowerPipe);
                pipes.shift(); // Remove this set of pipes from the array
            } else {
                pipe.upperPipe.style.left = `${currentLeft - 2}px`; // Move pipe leftward
                pipe.lowerPipe.style.left = `${currentLeft - 2}px`;
    
                // Check if the bird has passed the pipes without previously being marked as passed
                if (!pipe.passed && currentLeft + pipe.upperPipe.offsetWidth < bird.offsetLeft) {
                    pipe.passed = true; // Mark as passed to avoid incrementing score multiple times
                    score++; // Increment score
                    document.getElementById('score').textContent = `Score: ${score}`; // Update the score display
                }
            }
        });
    }

    function checkCollision() {
        const birdRect = bird.getBoundingClientRect();
        pipes.forEach(pipe => {
            const upperPipeRect = pipe.upperPipe.getBoundingClientRect();
            const lowerPipeRect = pipe.lowerPipe.getBoundingClientRect();
            if (
                birdRect.left < upperPipeRect.right && birdRect.right > upperPipeRect.left && birdRect.top < upperPipeRect.bottom ||
                birdRect.left < lowerPipeRect.right && birdRect.right > lowerPipeRect.left && birdRect.bottom > lowerPipeRect.top
            ) {
                endGame();
            }
        });
        if (birdY + bird.offsetHeight >= gameArea.offsetHeight) {
            endGame();
        }
    }

    function updateScore() {
        scoreDisplay.innerText = `Score: ${score}`;
    }

    function endGame() {
        clearInterval(updateGame);
        gameRunning = false;
        pipes.forEach(pipe => {
            gameArea.removeChild(pipe.upperPipe);
            gameArea.removeChild(pipe.lowerPipe);
        });
        pipes = [];
        gameOverDialog.style.display = 'block';
    }

    retryButton.addEventListener('click', () => window.location.reload());
    document.addEventListener('click', startGame, { once: true });
});

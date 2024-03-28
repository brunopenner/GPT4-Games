const pong = document.getElementById('pong');
const paddleA = document.getElementById('paddleA');
const paddleB = document.getElementById('paddleB');
const ball = document.getElementById('ball');
let paddleHeight = 70;

let ballX = 50, ballY = 50, ballDX = 2, ballDY = 2;
let paddleAX = 0, paddleAY = 50, paddleBX = 590, paddleBY = 50;
let paddleSpeed = 10;

function movePaddleA(up) {
  if (up && paddleAY > 0) {
    paddleAY -= paddleSpeed;
  } else if (!up && paddleAY < pong.offsetHeight - paddleHeight) {
    paddleAY += paddleSpeed;
  }
  paddleA.style.top = paddleAY + 'px';
}

function movePaddleB() {
  if (ballDY > 0 && paddleBY < ballY) {
    paddleBY = Math.min(pong.offsetHeight - paddleHeight, paddleBY + paddleSpeed);
  } else if (ballDY < 0 && paddleBY > ballY) {
    paddleBY = Math.max(0, paddleBY - paddleSpeed);
  }
  paddleB.style.top = paddleBY + 'px';
}

function moveBall() {
    let pongRect = pong.getBoundingClientRect();
    
    // Move ball by its current speed/direction
    ballX += ballDX;
    ballY += ballDY;
  
    // Ball collision with top and bottom of game area
    if (ballY <= 0 || ballY >= pong.offsetHeight - 10) {
      ballDY = -ballDY;
      ballY += ballDY;
    }
  
    // Ball collision with paddles
    let paddleARect = paddleA.getBoundingClientRect();
    let paddleBRect = paddleB.getBoundingClientRect();
    
    if (ballDX < 0 && ballX <= (paddleARect.right - pongRect.left) && ballY >= paddleAY && ballY <= paddleAY + paddleHeight) {
      ballDX = -ballDX;
      ballX = paddleARect.right - pongRect.left + 1;
    } else if (ballDX > 0 && ballX >= (paddleBRect.left - pongRect.left - 10) && ballY >= paddleBY && ballY <= paddleBY + paddleHeight) {
      ballDX = -ballDX;
      ballX = paddleBRect.left - pongRect.left - 11;
    }
  
    // Update ball position
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';
  }

function gameLoop() {
  moveBall();
  movePaddleB();
}

setInterval(gameLoop, 16);

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowUp') {
    movePaddleA(true);
  } else if (e.key === 'ArrowDown') {
    movePaddleA(false);
  }
});

const gameContainer = document.getElementById('game-container');
const car = document.getElementById('car');
const obstaclesContainer = document.getElementById('obstacles');
const scoreDisplay = document.getElementById('score');

let carPosition = 175;
let score = 0;
let gameRunning = true;
let obstacles = [];

function moveCar(direction) {
    if (direction === 'left' && carPosition > 0) {
        carPosition -= 10;
    } else if (direction === 'right' && carPosition < 350) {
        carPosition += 10;
    }
    car.style.left = carPosition + 'px';
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = Math.random() * 350 + 'px';
    obstaclesContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        const top = parseInt(obstacle.style.top || 0);
        obstacle.style.top = top + 5 + 'px';
        
        if (top > 600) {
            obstaclesContainer.removeChild(obstacle);
            obstacles.splice(index, 1);
            score++;
            scoreDisplay.textContent = 'Score: ' + score;
        }
        
        // Collision detection
        if (checkCollision(car, obstacle)) {
            gameRunning = false;
            alert('Game Over! Score: ' + score);
            location.reload();
        }
    });
}

function checkCollision(car, obstacle) {
    const carRect = car.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(carRect.right < obstacleRect.left || 
             carRect.left > obstacleRect.right || 
             carRect.bottom < obstacleRect.top || 
             carRect.top > obstacleRect.bottom);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveCar('left');
    } else if (e.key === 'ArrowRight') {
        moveCar('right');
    }
});

setInterval(() => {
    if (gameRunning) {
        moveObstacles();
        if (Math.random() < 0.02) {
            createObstacle();
        }
    }
}, 50);

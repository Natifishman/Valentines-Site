let score = 0;
let gameInterval;
let heartGenerationInterval = 1000;

function startGame() {
    score = 0;
    heartGenerationInterval = 1000;
    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('game_area').innerHTML = ''; // Clear any remaining hearts
    gameInterval = setInterval(generateHeart, heartGenerationInterval);
    setTimeout(endGame, 60000); // Game lasts 60 seconds
    increaseDifficulty();
}

function generateHeart() {
    const gameArea = document.getElementById('game_area');
    const heart = document.createElement('button');
    heart.textContent = '❤️';
    heart.classList.add('heart');
    heart.style.position = 'absolute';
    heart.style.top = Math.random() * (gameArea.clientHeight - 50) + 'px';
    heart.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    heart.onclick = function() {
        score++;
        document.getElementById('score').textContent = "Score: " + score;
        gameArea.removeChild(heart);
    };
    gameArea.appendChild(heart);

    // Remove the heart after 2 seconds if not clicked
    setTimeout(() => {
        if (gameArea.contains(heart)) {
            gameArea.removeChild(heart);
        }
    }, 2000);
}

function increaseDifficulty() {
    const difficultyInterval = setInterval(() => {
        if (heartGenerationInterval > 200) {
            heartGenerationInterval -= 100;
            clearInterval(gameInterval);
            gameInterval = setInterval(generateHeart, heartGenerationInterval);
        } else {
            clearInterval(difficultyInterval);
        }
    }, 10000); // Increase difficulty every 10 seconds
}

function endGame() {
    clearInterval(gameInterval);
    alert("Game Over! Your score is: " + score);
    if (score > 10) {
        window.location.href = "princess-game.html";
    } else {
        document.getElementById('game_area').innerHTML = '';
    }
}

function skipToPrincessGame() {
    window.location.href = "princess-game.html";
}

function backToMain() {
    window.location.href = "index.html";
}

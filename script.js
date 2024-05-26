let score = 0;
let gameInterval;

function startGame() {
    score = 0;
    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('game_area').innerHTML = ''; // Clear any remaining hearts
    gameInterval = setInterval(generateHeart, 1000);
    setTimeout(endGame, 30000);
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

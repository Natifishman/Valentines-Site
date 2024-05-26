const cardsArray = ['S', 'A', 'R', 'A', 'S', 'A', 'R', 'A']; // Adjust the array for your specific game

let flippedCards = [];
let matchedCards = [];

function createCard(letter) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front"></div>
        <div class="back">${letter}</div>
    `;
    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.querySelector('.front').innerHTML === card2.querySelector('.front').innerHTML) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cardsArray.length * 2) {
            showOverlay();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    overlay.innerHTML = `
        <div class="message">
            <h2>Congratulations!</h2>
            <p>You won!</p>
            <button onclick="restartGame()">Play Again</button>
        </div>
    `;
}

function restartGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    matchedCards = [];
    flippedCards = [];

    shuffle(cardsArray);
    cardsArray.forEach(letter => {
        const card = createCard(letter);
        gameBoard.appendChild(card);
    });

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('DOMContentLoaded', restartGame);

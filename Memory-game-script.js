const letters = ['S', 'A', 'R', 'A', 'S', 'A', 'R', 'A'];
let flippedCards = [];
let matchedPairs = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const scoreBoard = document.getElementById('score');
  const resetButton = document.getElementById('reset');

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

function createCard(letter) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front"></div>
      <div class="card-back">${letter}</div>
    </div>
  `;
  card.addEventListener('click', handleCardClick);
  return card;
}

  function shuffleAnimation() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.classList.add('shuffling'));
    setTimeout(() => cards.forEach(card => card.classList.remove('shuffling')), 500);
  }

  function initGame() {
    shuffle(letters);
    gameBoard.innerHTML = '';
    letters.forEach(letter => {
      const card = createCard(letter);
      gameBoard.appendChild(card);
    });
    shuffleAnimation(); // Trigger the shuffle animation
  }

  function handleCardClick(e) {
    const clickedCard = e.target.closest('.card');
    if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched') || flippedCards.length === 2) {
      return;
    }

    flipCard(clickedCard);

    if (flippedCards.length < 2) {
      flippedCards.push(clickedCard);
    }

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
 
function flipCard(card) {
  card.classList.add('flipped');
}

  function unflipCards() {
    flippedCards.forEach(card => card.classList.remove('flipped'));
    flippedCards = [];
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.letter === card2.dataset.letter) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      flippedCards = [];
      matchedPairs += 1;
      score += 10;
      updateScore();
      if (matchedPairs === letters.length / 2) {
        setTimeout(() => alert('Congratulations! You won!'), 300);
      }
    } else {
      setTimeout(unflipCards, 1000);
    }
  }

  function updateScore() {
    scoreBoard.textContent = `Score: ${score}`;
  }

  resetButton.addEventListener('click', () => {
    flippedCards = [];
    matchedPairs = 0;
    score = 0;
    updateScore();
    initGame();
  });

  initGame();
});

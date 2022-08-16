'use strict';
// selecting our elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

//starting conditions
let scores = [0, 0];
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (activePlayer === 0) {
    activePlayer = 1;
    player1El.classList.add('player--active'); //This is same as using toggle here. But for now, my head prefers me adding and manually remo
    player0El.classList.remove('player--active'); //This is same as using toggle here. But for now, my head prefers me adding and manually remo
  } else {
    player0El.classList.add('player--active'); //This is same as using toggle here. But for now, my head prefers me adding and manually remo
    player1El.classList.remove('player--active'); //This is same as using toggle here. But for now, my head prefers me adding and manually remo
    activePlayer = 0;
  }
}

// Adding the roll dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generate a random number for the dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display the dice number to the UI both score and picture
    diceEl.src = `./img/dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // to display the rolled dice score to the current score section
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // switch player and reset the current score of the active player back to zero
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to active player global score
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// To reset the game
// my logic

btnNewGame.addEventListener('click', function () {
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
});

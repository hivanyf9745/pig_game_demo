'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Function initialization

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

init();

//Function to switch to the next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling the dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll number
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    console.log(diceNum);

    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceNum}.png`;

    //3. Check for rolled 1
    if (diceNum !== 1) {
      //Add dice number to currentScore
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // current0El.textContent = currentScore; CHANGE LATER SOLVED
    } else {
      //Switch to new player
      switchPlayer();
    }
  }
});

//Holding current score

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active players's score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

//Restart the game
btnNew.addEventListener('click', init);

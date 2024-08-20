'use strict';

//* Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//* Creating function
const switchPlayer = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//* Edit text content of the selected elements or starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden'); //? CSS class selection do not require a .(period)

let playerTotalScores, currentScore, playerActive, playing;

const init = function () {
  playerTotalScores = [0, 0];
  currentScore = 0;
  playerActive = 0;
  playing = true;

  //TODO set all scores to 0
  for (let i = 0; i < playerTotalScores.length; i++) {
    playerTotalScores[i] = 0;
    document.getElementById(`score--${i}`).textContent =
      playerTotalScores[playerActive];
    document.getElementById(`current--${i}`).textContent = currentScore;
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
  }
  //TODO set player 0 as active player
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceElement.classList.add('hidden');
};
init();

//* Rolling functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //TODO Generating a random number for dice
    const dice = Math.trunc(Math.random() * 6) + 1; //console.log(dice);
    //TODO Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // Check if rolled 1
    if (dice !== 1) {
      //TODO Adding to the dice to current score
      currentScore += dice; //console.log(currentScore);
      //TODO Display the score
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      //TODO change player
      switchPlayer();
    }
  }
});

//* btn HOlD event handler
btnHold.addEventListener('click', function () {
  if (playing) {
    //TODO add the current score to TOTAL score
    //set player score into array
    playerTotalScores[playerActive] += currentScore;
    console.log(playerTotalScores[playerActive]);
    // Pass saved score from array to page element
    document.getElementById(`score--${playerActive}`).textContent =
      playerTotalScores[playerActive];
    if (playerTotalScores[playerActive] >= 100) {
      //TODO check the TOTAL score is above / equal to 100 game should end
      playing = false;
      //?console.log(`Player ${playerActive} wins`);
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${playerActive}`)
        .classList.remove('player--active');
      //TODO remove dice image
      diceElement.classList.add('hidden');
    } else {
      //TODO if not switch player
      switchPlayer();
    }
  }
});

//* btn NewGame event handler
btnNew.addEventListener('click', init);

import { Game, Hand, GameResult } from './scripts/game.js';
import { render } from './scripts/renderer.js';

const handCode = {
  btnRock: 1,
  btnPaper: 2,
  btnScissors: 3,
};

const game = new Game();
const buttons = document.querySelectorAll('#control button');

buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    const humanSelectedHand = handCode[e.target.id];
    const roundResult = game.playRound(humanSelectedHand);

    render(game, roundResult);
  });
});

restart.addEventListener('click', () => {
  window.location.reload();
});

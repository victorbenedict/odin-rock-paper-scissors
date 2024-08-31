import { Hand } from './game.js';

const HandsClassname = {
  [Hand.Rock]: 'rock',
  [Hand.Paper]: 'paper',
  [Hand.Scissors]: 'scissors',
};

export const render = (game, roundResult) => {
  const hiddenElements = document.querySelectorAll('.hidden');
  hiddenElements.forEach((element) => {
    element.classList.remove('hidden');
    element.classList.add('visible');
  });

  const roundDisplay = document.getElementById('round');
  roundDisplay.textContent = game.round;
  const humanHands = document.getElementById('humanHands');
  const humanPlay = game.player.getLastPlay();
  humanHands.className = `human ${HandsClassname[humanPlay]}`;
  const botHands = document.getElementById('botHands');
  const botPlay = game.bot.getLastPlay();
  botHands.className = `bot ${HandsClassname[botPlay]}`;

  humanScore.textContent = game.player.score;
  botScore.textContent = game.bot.score;
};

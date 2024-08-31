export const Hand = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

export const GameResult = {
  Draw: 0,
  Human: 1,
  Bot: 2,
};

const PlayerType = { Human: 0, Bot: 1 };

const WinConditions = {
  [Hand.Rock]: Hand.Scissors,
  [Hand.Paper]: Hand.Rock,
  [Hand.Scissors]: Hand.Paper,
};

class Player {
  constructor(name, type, score = 0) {
    this.name = name;
    this.type = type;
    this.score = score;
    this.plays = [];
  }

  addScore() {
    this.score++;
  }

  selectHand(handCode) {
    let selectedHand;
    const getHand = (code) => {
      return Object.keys(Hand).find((key) => Hand[key] === code);
    };

    if (this.type === PlayerType.Bot) {
      const randomCode = Math.ceil(Math.random() * 3);
      selectedHand = Hand[getHand(randomCode)];
    } else {
      selectedHand = Hand[getHand(handCode)];
    }
    this.plays.push(selectedHand);

    return selectedHand;
  }

  getLastPlay() {
    return this.plays[this.plays.length - 1];
  }
}

export class Game {
  constructor(roundLimit = 5) {
    this.player = new Player('Player', PlayerType.Human, 0);
    this.bot = new Player('Computer', PlayerType.Bot, 0);
    this.roundLimit = roundLimit;
    this.round = 0;
  }

  isMatchOver() {
    if (this.round === this.roundLimit) return true;

    const matchPoint = Math.floor(this.roundLimit / 2) + 1;
    if (
      this.player.score >= matchPoint ||
      this.bot.score >= matchPoint ||
      Math.max(this.player.score, this.bot.score) > this.roundLimit - this.round
    )
      return true;

    return false;
  }

  getWinner() {
    if (this.isMatchOver()) {
      if (this.player.score === this.bot.score) return GameResult.Draw;
      return this.player.score > this.bot.score
        ? GameResult.Human
        : GameResult.Bot;
    }
  }

  playRound(humanHand) {
    const botPlay = this.bot.selectHand();
    const humanPlay = this.player.selectHand(humanHand);
    let roundResult = GameResult.Draw;
    ++this.round;

    const isRightPlayerWins = (player1Hands, player2Hands) => {
      return Object.entries(WinConditions).some(
        ([k, v]) => Number(k) === player1Hands && v === player2Hands
      );
    };

    if (isRightPlayerWins(humanPlay, botPlay)) {
      this.player.addScore();
      roundResult = GameResult.Human;
    }
    if (isRightPlayerWins(botPlay, humanPlay)) {
      this.bot.addScore();
      roundResult = GameResult.Bot;
    }

    return roundResult;
  }
}

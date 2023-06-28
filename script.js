const hands = ['rock', 'paper', 'scissors'];
const hands_icon = ['✊', '✋', '✌'];
let number_of_wins = 5;
let result;

function Player(name, hands, score = 0){
	this.name = name;
	this.hands = hands;
	this.score = score;
}

Player.prototype.addScore = function(){
	return this.score ++;
}

Player.prototype.hands_icon = function(index){
	return hands_icon[index]
}
const human = new Player('Human')
const computer = new Player('computer')

function game(){
	computer.hands = getRandomHands();
	getWinner(human.hands, computer.hands)
	if ( human.score == number_of_wins || computer.score == number_of_wins ) {
		const buttons = document.querySelectorAll('.button_container button');
		buttons.forEach(button => {
			button.disabled = true;
			result = human.score == number_of_wins ? 'You are the winner!' : 'Computer won the match.'
		});
	}
}

function getRandomHands(){
	return Math.floor(Math.random() * 3);
}

function getWinner(){
	const a = `${human.hands}${computer.hands}`;
	if (human.hands == computer.hands){
		return result = 'Draw'
	}
	else if (a == 0o2 || a == 10 || a == 21){
		human.addScore();
		return result = 'Player won the round!'
	}
	else{
		computer.addScore();
		return result = 'Computer won the round!'
	}
}

function renderDisplay(index){
	const div_player_hands = document.querySelector('.player_hands');
	const div_computer_hands = document.querySelector('.computer_hands');
	div_player_hands.textContent = human.hands_icon(human.hands);
	div_computer_hands.textContent = computer.hands_icon(computer.hands);

	const div_player_score = document.querySelector('.player_score');
	const div_computer_score = document.querySelector('.computer_score');
	div_player_score.textContent = `Player: ${human.score}`
	div_computer_score.textContent = `Computer: ${computer.score}`

	const div_result = document.querySelector('.display_result');
	div_result.textContent = result;
}

//0-rock, 1-paper, 2-scissors
document.querySelector('.btn_rock').addEventListener('click', function(){
	human.hands = 0;
	game();
	renderDisplay(0);
});

document.querySelector('.btn_paper').addEventListener('click', function(){
	human.hands = 1;
	game();
	renderDisplay(1);
});

document.querySelector('.btn_scissors').addEventListener('click', function(){
	human.hands = 2;
	game();
	renderDisplay(2);
});

document.querySelector('.btn_restart').addEventListener('click', function(){
	location.reload();
});

const hands = ['rock', 'paper', 'scissors'];
const hands_icon = ['✊', '✋', '✌'];

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

function gameStart(){
	computer.hands = getRandomHands();
	getWinner(human.hands, computer.hands)
	console.log(`Human: ${human.score}`)
	console.log(`Computer: ${computer.score}`)
}

function getRandomHands(){
	return Math.floor(Math.random() * 3);
}

function getWinner(){
	const a = `${human.hands}${computer.hands}`;
	const draw = `${a} Draw!`;
	const playerWins = `${a} Player wins!`;
	const computerWins = `${a} Computer wins!`;
	if (human.hands == computer.hands){
		console.log(draw);
		return ''
	}
	else if (a == 0o2 || a == 10 || a == 21){
		human.addScore();
		console.log(playerWins);
		return ''
	}
	else{
		computer.addScore();
		console.log(computerWins);
		return ''
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
}

//0-rock, 1-paper, 2-scissors
document.querySelector('.btn_rock').addEventListener('click', function(){
	human.hands = 0;
	gameStart();
	renderDisplay(0);
});

document.querySelector('.btn_paper').addEventListener('click', function(){
	human.hands = 1;
	gameStart();
	renderDisplay(1);
});

document.querySelector('.btn_scissors').addEventListener('click', function(){
	human.hands = 2;
	gameStart();
	renderDisplay(2);
});

document.querySelector('.btn_restart').addEventListener('click', function(){
	location.reload();
});

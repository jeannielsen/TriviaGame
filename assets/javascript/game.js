//initialize Jquery code

$(document).ready(function() {

//declare global varibles
	var questionPlaceholder;		
	var correctAnswer;
	var incorrectAnswer;	
	var outOfTime;		
	var answered;
	var seconds;		
	var time;			
	var userChoice;	

	var text = {
		correct: "Good Job! You are correct.",
		incorrect: "Sorry, better luck next time",
		noTime: "You have run out of time!",
		final: "Here's how you did:",
	};

	var gameQuestions = [
		{	
			question: "Which actress was originally offered the role of Clarice Starling in Silence of the lambs?",
			options: ["Meg Ryan", "Michelle Pfeiffer", "Cher", "Julia Roberts"],
			correct: 1,
		},

		{
			question: "Which movie had a character named Peets Mellark?",
			options: ["Spectre", "The Hunger Games: Mockingjay Part 2", "Black Mass", "Pan"],
			correct: 1,
		},

		{
			question: "Which of the following movies was not based on a book by Stephen King?",
			options: ["Pet Sematary", "The Shining", "Misery", "The Hand That Rocks the Cradle"],
			correct: 3,
		},

		{
			question: "What movie had the quote with great power comes great responsibility?",
			options: ["The Lord of the Rings, Two Towers", "V for Vendetta", "Spiderman", "Monsters, Inc."],
			correct: 2,
        },
        
		{
			question: "Which actor appeared in Dogma, Good Will Hunting, and the Rainmaker",
			options: ["Ben Affleck", "Robert Downey Jr", "Matt Damon", "Tom Cruise"],
			correct: 2,

        },
        
		{
			question: "What movie's last line was What about the person we show it to?  What will happen to them?",
			options: ["The Ring", "Minority Report", "Brokeback Mountain", "Gangs of New York" ],
			correct: 0,	
		},
	];

	// hide questions at start
	$("#gameArea").hide();

	// button click to start new game
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});



	// once game is started, show questions, hide results, set counters to zero
	function newGame() {
		$("#gameArea").show();
		$("#response").hide();
		$("#outcome").hide();		
		correctAnswer = 0;
		incorrectAnswer = 0;
		outOfTime = 0;
		questionPlaceholder = 0;
		questions();
	}
	// function to call question
	
	function questions() {
		$("#response").hide();
		$("#ques").show();
		answered = true;
		// text question to screen
		$(".question").html(gameQuestions[questionPlaceholder].question);

		// loops through questions
		for (var i = 0; i <= 20; i++) {
			var list = $("<div>");
			list.text(gameQuestions[questionPlaceholder].options[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".options").append(list);
		}

		//calls timer
		countdown();

		// record user click
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// timer function
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		time = setInterval(showCountdown, 1000);
	}

	// display timer
	function showCountdown() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			
		} else {
			$("#time").html("00:" + seconds);
			
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}
	// hides questions and results, shows answer, empties .thisChoice
	function shoAnswer() {
		$("#ques").hide();
		$("#outcome").hide();
		$("#response").show();
		$(".thisChoice").empty();

		var rightAnswerText = gameQuestions[questionPlaceholder].options[gameQuestions[questionPlaceholder].correct];
		var rightAnswerIndex = gameQuestions[questionPlaceholder].correct;

		// keeps track of user's answers and displays
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			incorrectAnswer++;
			$("#text").html(text.incorrect);
			$('#sorry').attr("src", "...assets/images/sorry2.jpg");
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			outOfTime++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//sets timer timeout
		if (questionPlaceholder === (gameQuestions.length-1)) {
			setTimeout(results, 1000);
		} else {
			questionPlaceholder++;
			setTimeout(questions, 1000);
		}

	}

	function results() {
		$("#response").hide();
		$("#ques").hide();
		$("#outcome").show();
		$("#resultText").html(text.final);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#incorrectAnswers").html("Incorrect: " + incorrectAnswer);
		$("#outOfTime").html("Timed out: " + outOfTime);
		$("#playAgain").show();
		$("#playAgain").html("Play Again?");
	}

		// play again button, on click hide results page
		$("#playAgain").on("click", function(){
			$("#outcome").hide();
			newGame();
		});
});
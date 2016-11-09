// global variables 
var questions = {
	q1 : [ "what color is purple","orange", "green", "purple", "pink" ],
	q2 : ["what is your favorite thing", "peaches", "plums", "oranges", "apricots"],
	q3 : ["what is your favorite dog", "cat", "dog"]
}

var correctAnswer = {
	q1 : "orange",
	q2 : "peaches",
	q3 : "cat"

}

var timer;
var interval;
var timeToAnswer = 10;
var counter = timeToAnswer;
var questionAnswered =1;
var answersCorrect = 0;
var answersWrong = 0;
var answersBlank = 0;


$(document).ready(function(){
	//counts down the timer on UI
	function decrement(){
		counter--;
		$("#timer").html(counter + " seconds left");

	}
	//initializes the timer and starts count 
	function timerInit(){
		timer = setTimeout(timeUp, timeToAnswer*1000);
	}

	//initalizes the interval and starts count
	function intervalInit(){
		interval = setInterval(decrement, timeToAnswer*100);
	}

	//initalize game 
	function gameInit(){
		//set up timer view
		$("#timer").append( timeToAnswer + " seconds left");
		//pull first question
		$("#question").append(questions.q1[0]);
		
		//generate a list of possible answers for first question
		for(var i = 1; i < questions.q1.length; i++) {
		$("#answers").append("<div class=\"choices\">"+questions.q1[i]+"</div>");
		}
		timerInit();
		intervalInit();
	}
	//loads next quetion and resets 
	function nextQuesiton(){
		questionAnswered++;
		
		// if there are no more questions left end game and give score
		if(questionAnswered > Object.keys(questions).length /*length of object*/){
			gameOver();
			clearInterval(interval);
		} else{
			//restart timer and ask next question
			//move to next question
			console.log(questionAnswered);
			$("#question").html(questions["q" + questionAnswered][0]);
			//clears out old answers
			$("#answers").empty();
			
			//generate a list of possible answers for first question
			for(var i = 1; i < questions["q" + questionAnswered].length; i++) {
			$("#answers").append("<div class = \"choices\">"+questions["q" + questionAnswered][i]+"</div>");
			}
			
			//clear countdown and restart
			clearInterval(interval);
			counter = timeToAnswer;
			$("#timer").html(timeToAnswer + " seconds left");
			intervalInit();
			timerInit();
			
		}

	}

	// what happens when game over is triggered
	function gameOver(){
		clearInterval(interval);
		clearTimeout(timer);
		$(".mainsection").empty();
		$(".mainsection").append("<div> Questions Correct " + answersCorrect + "</div");
		$(".mainsection").append("<div> Questions Incorrect " + answersWrong + "</div");
		$(".mainsection").append("<div> Questions Blank " + answersBlank + "</div");
	}

	// game starts when start button is pushed
	$("#start").on("click", function(){
		//clear out start button
		$("#start").remove();
		//run itialize function
		gameInit();
		
	});

	
	//when player chooses question
	$("section").on("click", ".choices" ,function(){
		nextQuesiton();
		console.log(this);
		 var userChoice = $(this).text();
		 console.log(userChoice);
		 var questionAnswerIs = correctAnswer["q" + (questionAnswered-1)];
		 console.log(questionAnswerIs);
		 //after question ends update section for few minutes then re-init
		 $("#answers").html("hi");
		 clearInterval(interval);
		 setTimeout(nextQuesiton, 10000);
		 

		 if(userChoice === questionAnswerIs) {
		 	answersCorrect++;
		 	console.log("answersCorrect " + answersCorrect)

		 } else {
		 	answersWrong++;
		 	console.log("answers wrong "+ answersWrong)
		 }

	
		
	});

	function timeUp(){
		answersBlank++;
		nextQuesiton();
		
	}

	
	


});
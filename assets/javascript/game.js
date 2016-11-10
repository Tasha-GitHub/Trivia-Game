// global variables //----------------fix these to be in quotes------------//
var questions = {
	"q1" : [ "What is the state capital of Alabama?","Montgomery", "Birmingham", "purple", "pink" ],
	"q2" : ["What is the state capital of Alaska", "Juneau", "Anchorage", "oranges", "apricots"],
	"q3" : ["What is the state capital of Arizona", "Phoenix", "dog"]
}

var correctAnswer = {
	"q1" : "Montgomery",
	"q2" : "Juneau",
	"q3" : "Phoenix"

}

var correspondingImages = {
	"q1" : "../images/alabama.jpg",
	"q2" : "../images/alaska.png",
	"q3" : "../images/arizona.png"
}

var timer;
var interval;
var timeToAnswer = 10;
var counter = timeToAnswer;
var questionAnswered =1;
var answersCorrect = 0;
var answersWrong = 0;
var answersBlank = 0;
var isRight;


$(document).ready(function(){
	//counts down the timer on UI
	function decrement(){
		counter--;
		$("#timer").html("Time Remaining: " + counter + " seconds left");

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
		$("#timer").append("Time Remaining: " + timeToAnswer + " seconds left");
		//pull first question
		$("#question").append(questions.q1[0]);
		
		//generate a list of possible answers for first question
		for(var i = 1; i < questions.q1.length; i++) {
		$("#answers").append("<div class=\"choices\">"+questions.q1[i]+"</div>");
		}
		timerInit();
		intervalInit();
	}

	function cutScene(){

		//after question ends update section for few minutes then re-init
		$("#answers").css("border-style", "none");
		$("#answers").html("<div>" + isRight + "</div>" + "The Correct Answer is " + correctAnswer["q" + (questionAnswered)]);
		var imageHTML = $("<div class = \"image\" + <img src =" + correspondingImages["q" + (questionAnswered)]+"> </div>");
		imageHTML.appendTo("#answers");
		clearInterval(interval);
		clearTimeout(timer);
		//hide all other components
		$("#timer").hide();
		$("#question").hide();
		$(".headerSection").hide();
		setTimeout(nextQuesiton, 10000);
	}

	//loads next quetion and resets 
	function nextQuesiton(){
		questionAnswered++;
		
		// if there are no more questions left end game and give score
		if(questionAnswered > Object.keys(questions).length /*length of object*/){
			gameOver();
		} else{
			//restart timer and ask next question
			//move to next question
			//show old hidden components
			$("#timer").show();
			$("#answers").show();
			$("#question").show();
			$(".headerSection").show();
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
			$("#timer").html("Time Remaining: " + timeToAnswer + " seconds left");
			intervalInit();
			timerInit();
			
		}

	}

	// what happens when game over is triggered
	function gameOver(){
		clearInterval(interval);
		clearTimeout(timer);
		$("#timer").hide();
		$("#answers").hide();
		$("#question").hide();
		$(".headerSection").hide();
		$(".mainsection").append("<div class = \"results\"> Questions Correct " + answersCorrect + "</div");
		$(".mainsection").append("<div class = \"results\"> Questions Incorrect " + answersWrong + "</div");
		$(".mainsection").append("<div class = \"results\"> Questions Blank " + answersBlank + "</div");
		$(".mainsection").append("<div class = \"results\"> <button class =\"startOver btn btn-primary\"> Start Over </button> </div>");
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
		 var userChoice = $(this).text();
		// console.log(userChoice);
		 var questionAnswerIs = correctAnswer["q" + (questionAnswered)];
		 //cuts to show answer before running next question
		 if(userChoice === questionAnswerIs) {
		 	answersCorrect++;
		 	console.log("answersCorrect " + answersCorrect)
		 	isRight = "Correct!"

		 } else {
		 	answersWrong++;
		 	console.log("answers wrong "+ answersWrong)
		 	isRight = "Wrong!"
		 }
		 cutScene();
	});

	//when player hovers over a question
	$("section").on("mouseenter", ".choices" ,function(){
		$(this).css("color","red");
	});
	//when hover stops
	$("section").on("mouseleave", ".choices" ,function(){
		$(this).css("color","black");
	});

	//when player clicks on start over button
	$("section").on("click", ".startOver" ,function(){
		//unhides elements
		$("#timer").show();
		$("#answers").show();
		$("#question").show();
		$(".headerSection").show();
		//resets all variables 
		questionAnswered = 1;
		answersCorrect = 0;
		answersWrong = 0;
		answersBlank = 0;
		counter = timeToAnswer;
		//clears out old answers
		$("#question").empty();
		$("#timer").empty();
		$("#answers").empty();
		$(".results").empty();
		//initalizes game
		gameInit();

		

	});

	function timeUp(){
		answersBlank++;
		isRight = "Time Up!"
		cutScene();
	}





});
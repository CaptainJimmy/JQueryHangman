$(document).ready(function(){



//variables
var wins=0;
var losses=0;
var lettersGuessed=[];
var wordBank=[];
var guessesLeft;
var guessesMade=0;
var pickedWord;
var isWinner;
var pickedWordArray=[];
var pickedWordPlaceholders;
var keyboard={
	"row1": ["q","w","e","r","t","y","u","i","o","p"],
	"row2":	["a","s","d","f","g","h","j","k","l"],
	"row3": ["z","x","c","v","b","n","m"]};



//functions

//grab a random word from the API

function RandomWord() {
	console.log("RandomWord");
        var requestStr = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=conjunction&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

        $.ajax({
            type: "GET",
            url: requestStr
        }).done(function(result) {
       pickedWord = result[0].word.toLowerCase();
         // split pickedWord into an array (array.split(""))
   		pickedWordArray=pickedWord.split("");
   		console.log(pickedWordArray);
   		displayWord();
   		isWinner=pickedWordArray.length;
    })
 }

 function displayWord(){
 	console.log("displayword");
 	$('#picked-word-array').empty();
 	$('#picked-word-array').html($('<h2>').text("Your Clue: " ));
 	var pickedWordSendIt="";
for (var i=0; i < pickedWordArray.length; i++){
		pickedWordSendIt=($('<button>').addClass("btn btn-danger").attr("index-value",i)).append($('<i>').addClass("fa fa-minus"));
		$('#picked-word-array').append(pickedWordSendIt);
		}
		
 		$('#guesses-left').html($('<h3>').text("Guesses Left: " + guessesLeft));
 		$('#guesses-made').html($('<h3>').text("Guesses Made So Far: "));
 }


function newGame(){
	// reset guesses left
	guessesLeft=8;
	//display the score
	 $('#wins').html($('<h3>').text("Wins: " + wins));
 	$('#losses').html($('<h3>').text("Losses: " + losses));
	// empty out pickedWordPlaceholders
	$('#picked-word-array').empty();
	// empty out lettersGuessed
	$('#guesses-left').empty();
	$('#guesses-made').empty();
	$('#messages').empty();
	//create the keyboard

	//empty the div, add the first row
	$('#keyboard-id').html($('<div>').addClass("row1 text-center"));

//create the first row
	for (var i=0; i < keyboard.row1.length ; i++ ){
		var newButton=$('<button>');
		newButton.attr("class","btn btn-primary keyboardButton").text(keyboard.row1[i]).attr("data-value",keyboard.row1[i]);
		$('#keyboard-id').append(newButton);
		}
	//create the second row
	$('#keyboard-id').append($('<div>').addClass("row2"));
	for (var i=0;i < keyboard.row2.length;i++){
		var newButton=$('<button>');
		newButton.attr("class","btn btn-danger keyboardButton").text(keyboard.row2[i]).attr("data-value",keyboard.row2[i]);
		$('#keyboard-id').append(newButton);
		}
		//create the third row
	$('#keyboard-id').append($('<div>').addClass("row3"));
	for (var i=0; i < keyboard.row3.length;i++){
		var newButton=$('<button>');
		newButton.attr("class","btn btn-info keyboardButton").text(keyboard.row3[i]).attr("data-value",keyboard.row3[i]);
		$('#keyboard-id').append(newButton);
		}
	// grab a new word
	RandomWord();
}
function letterIsClicked(keyPressed){
		//check to see if the letter is in the lettersGuessed
		var letterIndex=lettersGuessed.indexOf(keyPressed)

		if (letterIndex != -1)	{
				console.log("PRESSED BEFORE");
				//check to see if guessesLeft = 0
				if (guessesLeft <= 0) {
					//if its zero, call gameover
					console.log("calling gameOver from letterIsClicked True");
					gameOver("loss");
					}
			console.log("guessesLeft letterIsClicked true " + guessesLeft);
			$('#messages').html($('<h2>').text("Letter Has Been Pressed Before"));
			}
			//letter is new
		else if (letterIndex = -1){
			console.log("Letter has Not Been Pressed Before");
			//check to see if guessesLeft = 0
				if (guessesLeft <= 0) {
					//if its zero, call gameover
					console.log("calling gameOver from letterIsClicked false");
					gameOver();
					}
			letterIsNewGuess(keyPressed);

			}

		else {console.log("ERROR")}
		
			
		
		//i check to see if its in the pickedWordArray
			//letterIsGuessed(keypressed);
			//Change the dash to a letter,
			//check to see if the game is over



		//if the letter isnt in the picked word 
			//guessesLeft--;
			//letterIsGuessed(keypressed);
	};

function letterIsNewGuess(keyPressed){
	console.log("letterIsGuessed");
		console.log(keyPressed);
		//Add the key to the #guesses-made
	
		lettersGuessed.push(keyPressed);
		
		//push the message
		if (pickedWordArray.includes(keyPressed)){
			$('#messages').html($('<h2>').text("Well Done."));
			$('#guesses-made').append($('<button>').addClass("btn btn-success").text(keyPressed));
		}
		else {
			$('#messages').html($('<h2>').text("Ouch. That wasn't good."));
			$('#guesses-made').append($('<button>').addClass("btn btn-warning").text(keyPressed));
		}


			var pickedWordSendIt="";
		//redraw the clue
		$('#picked-word-array').empty();
 		$('#picked-word-array').html($('<h2>').text("Your Clue: " ));
		for (var i=0; i<pickedWordArray.length;i++){
			//if the array[i] is equal to the key, display the button as a key
			if (pickedWordArray[i]===keyPressed){
				pickedWordSendIt=$('<button>').addClass("btn btn-danger").text(keyPressed);
				$('#picked-word-array').append(pickedWordSendIt);
				isWinner--;
				if (isWinner <= 0){ gameOver(win);}
				}
				// else make it a dash
				else
				{
				pickedWordSendIt=($('<button>').addClass("btn btn-danger").attr("index-value",i)).append($('<i>').addClass("fa fa-minus"));
				$('#picked-word-array').append(pickedWordSendIt);
				}
		}
	}
};

function gameOver(outcome){
	switch(outcome){
		case win:
			console.log("GAME OVER. YOU WON");
			wins++;
			$('#messages').html($('<h2>').text("Game Over. WINNER WINNER CHICKEN DINNER. Press a New Game to play again"));
			break;
		case lose:
			console.log("GAME OVER YOU LOSE");
			$('#messages').html($('<h2>').text("Game Over. Better Luck Next Time."));
			losses++;
	}
};

//event listeners

//newgame
 $(document).on('click','#new-game', function(event){
 	event.preventDefault();
 	newGame();
});


// Keyboard Listener. When a letter is clicked, execute the letterIsClicked function.

$(document).on('click','.keyboardButton', function(event){
	console.log("Keyboard ID");
	var keyPressed=$(this).attr('data-value');
	//disable the letter on the keyboard.  
	$(this).addClass("disabled");
	letterIsClicked(keyPressed);

});


});


$(document).ready(function(){



//variables
var wins=0;
var losses=0;
var lettersGuessed=[];
var wordBank=[];
var guessesLeft;
var guessesMade=0;
var pickedWord;
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
       pickedWord = result[0].word;
   		pickedWordArray=pickedWord.split("");
   		console.log(pickedWordArray);
   		displayWord();
    })
 }

 function displayWord(){
 	console.log("displayword");
 	$('#picked-word-array').empty();
 	$('#picked-word-array').html($('<h2>').text("Your Clue: " ));
 	var pickedWordSendIt="";
for (var i=0; i < pickedWordArray.length; i++){
		pickedWordSendIt=($('<button>').addClass("btn btn-danger").attr("index-value",i)).append($('<i>').addClass("fa fa-minus fa-2x"));
		//pickedWordSendIt.append($('<span>').addClass("glyphicons glyphicons-minus"));
		$('#picked-word-array').append(pickedWordSendIt);
		}
		
			//.append(pickedWordSendIt));
 		$('#guesses-left').html("Guesses Left: " + guessesLeft);
 		$('#guesses-made').html("Guesses Made So Far: ");
 }


function newGame(){
	// reset guesses left
	guessesLeft=10;
	//display the score
	 $('#wins').text("Wins: " + wins);
 	$('#losses').text("Losses: " + losses);
	// empty out pickedWordPlaceholders
	$('#picked-word-array').empty();
	// empty out lettersGuessed
	$('#guesses-left').empty();

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
	
	




 $(document).on('click','#new-game', function(event){
 	event.preventDefault();
 	newGame();
});

});



//event listeners

 //$('#new-game').on('keyup', function(event){
// console.log(event);
// var keyVal = event.whatever

// if keyVal is already in the lettersGuessedArray
	// if NOT push keyval into lettersguessedarray
	//letterPress(keyVal)

//})


// split pickedWord into an array (array.split(""))
	// loop over pickedWordArray and create blank dashes for our placeholders


	// placeholders.join(" ") to the DOM



//	// fun a for loop over our picked word array
		// if valOfLetterPressed === pickedWordArray[i]
			//its a match, placeHoldersArray[i] = valOfLetterPressed
			//reweite placedHoldersArray to DOM


	// else if not a match
	//guessesLeft--;
	//if guesses:eft === then game over
	//write game over message to the dom and let them know the correct word

//}



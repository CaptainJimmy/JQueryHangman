$(document).ready(function(){



variables
var wins;
var losses;
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
        var requestStr = "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

        $.ajax({
            type: "GET",
            url: requestStr
        }).done(function(result) {
        	console.log(result);
       pickedWord = result[0].word;
        console.log(pickedWord);
    })
 }

function newGame(){
	// grab a new word
	RandomWord();
	console.log(pickedWord);
	// reset guesses left
	guessesLeft=0;
	// empty out pickedWordPlaceholders
	$('#picked-word-array').empty();
	// empty out lettersGuessed
	$('#guesses-left').empty();

	//create the keyboard

	// split pickedWord into an array (array.split(""))
	// loop over pickedWordArray and create blank dashes for our placeholders

	// placeholders.join(" ") to the DOM


}

//	// fun a for loop over our picked word array
		// if valOfLetterPressed === pickedWordArray[i]
			//its a match, placeHoldersArray[i] = valOfLetterPressed
			//reweite placedHoldersArray to DOM


	// else if not a match
	//guessesLeft--;
	//if guesses:eft === then game over
	//write game over message to the dom and let them know the correct word

//}


//event listeners

 //$('#new-game').on('keyup', function(event){
// console.log(event);
// var keyVal = event.whatever

// if keyVal is already in the lettersGuessedArray
	// if NOT push keyval into lettersguessedarray
	//letterPress(keyVal)

//})



 $('#new-game').on('click', function(event){
 	newGame();
});


























//brackets for document ready, remove comment later
});
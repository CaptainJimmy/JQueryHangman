$(document).ready(function(){



//variables
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
        	//console.log(result);
       pickedWord = result[0].word;
        console.log(pickedWord);
        return pickedWord;
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

	//empty the div, add the first row
	$('#keyboard-id').html($('<div>').addClass("row1 text-center"));

//create the first row
	for (var i=0; i < keyboard.row1.length ; i++ ){
		var newButton=$('<button>');
		newButton.attr("class","btn btn-danger keyboardButton").text(keyboard.row1[i]).attr("data-value",keyboard.row1[i]);
		$('#keyboard-id').append(newButton);
	}
	//create the second row
	$('#keyboard-id').append($('<div>').addClass("row2"));
	for (var i=0;i < keyboard.row2.length;i++){
		var newButton=$('<button>');
		newButton.attr("class","btn btn-warning keyboardButton").text(keyboard.row2[i]).attr("data-value",keyboard.row2[i]);
		$('#keyboard-id').append(newButton);
		}
		//create the third row
	$('#keyboard-id').append($('<div>').addClass("row3"));
	for (var i=0; i < keyboard.row3.length;i++){
		var newButton=$('<button>');
		newButton.attr("class","btn btn-info keyboardButton").text(keyboard.row3[i]).attr("data-value",keyboard.row3[i]);
		$('#keyboard-id').append(newButton);
		}



	}

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


//event listeners

 //$('#new-game').on('keyup', function(event){
// console.log(event);
// var keyVal = event.whatever

// if keyVal is already in the lettersGuessedArray
	// if NOT push keyval into lettersguessedarray
	//letterPress(keyVal)

//})


 $(document).on('click',$('#new-game'), function(event){
 	event.preventDefault();
 	newGame();
});

});


























//brackets for document ready, remove comment later
//});
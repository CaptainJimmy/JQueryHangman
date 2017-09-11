$(document).ready(function() {

    //v1.02

    //variables
    var wins = 0;
    var losses = 0;
    var lettersGuessed = [];
    var wordBank = [];
    var guessesLeft;
    var dashWordClue = [];
    var guessesMade = 0;
    var pickedWord;
    var isWinner;
    var pickedWordArray = [];
    var pickedWordPlaceholders;
    var keyboard = {
        "row1": ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        "row2": ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        "row3": ["z", "x", "c", "v", "b", "n", "m"]
    };



    //functions

    //grab a random word from the API

    function RandomWord() {
        var requestStr = "https://api.wordnik.com:443/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=conjunction&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

        $.ajax({
            type: "GET",
            url: requestStr
        }).done(function(result) {
            pickedWord = result[0].word.toLowerCase();
            // split pickedWord into an array (array.split(""))
            pickedWordArray = pickedWord.split("");
            displayWord();
            isWinner = pickedWordArray.length;
            //create the dashWordClue
            dashWordClue = [];
            for (var i = 0; i < pickedWordArray.length; i++) {
                dashWordClue.push("-");
            }
        })
    }

    function displayWord() {
        console.log("displayword");
        $('#picked-word-array').empty();
        $('#picked-word-array').html($('<h2>').text("Your Clue: "));
        var pickedWordSendIt = "";
        for (var i = 0; i < pickedWordArray.length; i++) {
            pickedWordSendIt = ($('<button>').addClass("btn btn-danger clue-buttons")).append($('<i>').addClass("fa fa-minus"));
            $('#picked-word-array').append(pickedWordSendIt);
        }

        $('#guesses-left').html($('<h3>').text("Guesses Left: " + guessesLeft));
        $('#guesses-made').html($('<h3>').text("Guesses Made So Far: "));
    }


    function newGame() {
        // reset guesses left
        guessesLeft = 8;
        //display the score
        $('#wins').html($('<h3>').text("Wins: " + wins));
        $('#losses').html($('<h3>').text("Losses: " + losses));
        // empty out pickedWordPlaceholders
        $('#picked-word-array').empty();
        // empty out lettersGuessed
        $('#guesses-left').empty();
        $('#guesses-made').empty();
        $('#messages').empty();
        lettersGuessed = [];
        //create the keyboard

        //empty the div, add the first row
        $('#keyboard-id').html($('<div>').addClass("row1 text-center"));

        //create the first row
        for (var i = 0; i < keyboard.row1.length; i++) {
            var newButton = $('<button>');
            newButton.attr("class", "btn btn-primary keyboardButton").text(keyboard.row1[i]).attr("data-value", keyboard.row1[i]);
            $('#keyboard-id').append(newButton);
        }
        //create the second row
        $('#keyboard-id').append($('<div>').addClass("row2"));
        for (var i = 0; i < keyboard.row2.length; i++) {
            var newButton = $('<button>');
            newButton.attr("class", "btn btn-danger keyboardButton").text(keyboard.row2[i]).attr("data-value", keyboard.row2[i]);
            $('#keyboard-id').append(newButton);
        }
        //create the third row
        $('#keyboard-id').append($('<div>').addClass("row3"));
        for (var i = 0; i < keyboard.row3.length; i++) {
            var newButton = $('<button>');
            newButton.attr("class", "btn btn-info keyboardButton").text(keyboard.row3[i]).attr("data-value", keyboard.row3[i]);
            $('#keyboard-id').append(newButton);
        }
        // grab a new word
        RandomWord();
    }

    function letterIsClicked(keyPressed) {
        //check to see if the letter is in the lettersGuessed
        var letterIndex = lettersGuessed.indexOf(keyPressed)

        if (letterIndex != -1) {
            //check to see if guessesLeft = 0
            if (guessesLeft <= 0) {
                //if its zero, call gameover
                gameOver("lose");
            }
            $('#messages').html($('<h2>').text("Letter Has Been Pressed Before"));
        }
        //letter is new
        else if (letterIndex === -1) {
            //check to see if guessesLeft = 0
            if (guessesLeft <= 0) {
                //if its zero, call gameover
                gameOver("lose");
            }
            letterIsNewGuess(keyPressed);

        } else {
            console.log("ERROR")
        }

    };

    function letterIsNewGuess(keyPressed) {
  
        //Add the key to the #guesses-made

        lettersGuessed.push(keyPressed);
        //if the pickedWord includes the keypressed, 	
        //push the message 
        $('#picked-word-array').empty();
        $('#picked-word-array').html($('<h2>').text("Your Clue: "));

        if (pickedWordArray.includes(keyPressed)) {

            $('#guesses-made').append($('<button>').addClass("btn btn-success clue-buttons").text(keyPressed));
            var pickedWordSendIt = "";
            //redraw the clue

            for (var i = 0; i < pickedWordArray.length; i++) {
                //if the array[i] is equal to the key, display the button as a key
                if (pickedWordArray[i] === keyPressed) {
                    dashWordClue[i] = keyPressed;
                    isWinner--;
                    if (isWinner <= 0) {
                        gameOver("win");
                    }
                }
                // if it doesnt match and the clue is a dash (if its not a dash leave it alone)
                else if (pickedWordArray[i] != keyPressed && dashWordClue[i] === "-") {
                    dashWordClue[i] = "-";
                }
            }
        } else {
            $('#messages').html($('<h2>').text("Ouch. That wasn't good."));
            $('#guesses-made').append($('<button>').addClass("btn btn-warning clue-buttons").text(keyPressed));
            guessesLeft--;
            $('#guesses-left').html($('<h3>').text("Guesses Left: " + guessesLeft));
        }


        //display the Clue
        for (var j = 0; j < dashWordClue.length; j++) {
            if (dashWordClue[j] === "-") {
                pickedWordSendIt = ($('<button>').addClass("btn btn-danger clue-buttons").attr("index-value", j)).append($('<i>').addClass("fa fa-minus"));
                $('#picked-word-array').append(pickedWordSendIt);
            } else {
                pickedWordSendIt = $('<button>').addClass("btn btn-danger clue-buttons").text(dashWordClue[j]);
                $('#picked-word-array').append(pickedWordSendIt);
            }
        }
    }

    function gameOver(outcome) {
        winOrLoss = outcome;
        switch (winOrLoss) {
            case "win":
                wins++;
                $('#messages').html($('<h2>').text("Game Over. WINNER WINNER CHICKEN DINNER. Press a New Game to play again"));
                $("#winModal").modal();
                break;
            case "lose":
                $('#messages').html($('<h2>').text("Game Over. Better Luck Next Time. The correct word was: " + pickedWord));
                losses++;
                $("#loseModal").modal();
                $('#modal-message').text("Game Over. Better Luck Next Time. The correct word was: " + pickedWord);
        }

    };

    //event listeners

    //newgame
    $(document).on('click', '#new-game', function(event) {
        event.preventDefault();
        //$(".modal").modal();
        newGame();

    });


    // Keyboard Listener. When a letter is clicked, execute the letterIsClicked function.

    $(document).on('click', '.keyboardButton', function(event) {
        var keyPressed = $(this).attr('data-value');
        //disable the letter on the keyboard.  
        $(this).addClass("disabled");
        letterIsClicked(keyPressed);

    });


});
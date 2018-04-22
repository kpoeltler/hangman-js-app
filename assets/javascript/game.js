
function generateWord() {
let wordBank = ["Blackhole", "quasars", "asteroid", "galaxy", "eclipse"];
let randomIndex = Math.floor(Math.random()* wordBank.length);
return wordBank[randomIndex].toLowerCase().split("");
}

var gameStats = {
    chosenWord: [],
    lettersGuessed: [],
    remainingGuesses: 10,
    consoleArr:[],

    createConsole: function() {
        var consoleArray = "";
        this.consoleArr.forEach(function(space){
            if (space ==="_") {
                consoleArray += "<div class='letter_space'><img class='blank-letter' src='assets/images/telescope.jpg' alt='telescope' /></div>";
            } else {
                consoleArray += "<div class= 'letter_space correct-letter'>" + space.toUpperCase() + "</div>";
            }
        });
        return consoleArray;
    },

    resetStats: function() {
        this.chosenWord = generateWord();
        this.lettersGuessed = [];
        this.remainingGuesses = 10;
        this.consoleArr = this.chosenWord.map(function(letter){
            return "_";
        });
    }
};

var gameElements = {
    word:document.querySelector("#word_to_guess"),
    remainingGuesses:document.querySelector("#remaining_guesses"),
    lettersGuessed:document.querySelector("#letters_guessed"),
    gameOver:document.querySelector("#game_over"),
    promptToStart:document.querySelector("#prompt_to_start"),
    incorrectGuess:document.querySelector("#incorrect_guess"),

resetWord: function() {
    this.word.innerHTML = gameStats.createConsole();
    this.remainingGuesses.innerText = gameStats.remainingGuesses;
    this.lettersGuessed.innerText = gameStats.lettersGuessed;
},

updateLetterCorrect: function() {
    this.word.innerHTML = gameStats.createConsole();
    this.lettersGuessed.innerText = gameStats.lettersGuessed.join(",").toUpperCase();
},

updateLetterIncorrect: function() {
    this.remainingGuesses.innerText = gameStats.remainingGuesses;
    this.lettersGuessed.innerText = gameStats.lettersGuessed.join(",").toUpperCase();
},



displayAlerts: function() {
    this.gameOver.style.display = "block";
    this.promptStart.style.display = "block";
},

displayAnswer: function() {
    function createAnswer() {
        gameStats.chosenWord.forEach(function(space){
            answer += "<div class='letter_space'>" + space.toUpperCase() + "</div>";
        });
        return answer;
    }
    this.word.innerHTML = createAnswer();
  }
}

function gameSetUp() {
    gameElements.prompStart.style.display = "none";
    gameElements.gameOver.style.display = "none";
    gameStats.resetStats();
    gameElements.resetWord();
    window.removeEventListener("keyup", gameSetUp);
    window.addEventListener("keyup", playGame);
}

function processGuess(guess) {
    if (gameStats.chosenWord.includes(guess) && !gameStats.lettersGuessed.includes(guess)) {
        var arrOfIndex = [];
        gameStats.chosenWord.forEach(function(letter, index){
            if (letter === guess) {
         arrOfIndex.push(index);
            }
        });
        arrOfIndex.forEach(function(i) {
            gameStats.consoleArr[i] = guess;
        });
        gameStats.lettersGuessed.push(guess);
        gameElements.updateLetterCorrect();
        console.log("your progress:", gameStats.consoleArr.join(""));
    } else {
        if (!gameStats.lettersGuessed.includes(guess)) {
            gameStats.remainingGuesses--;
            gameStats.lettersGuessed.push(guess);
            gameElements.updateLetterIncorrect();
        } else {
            gameElements.incorrectGuess.innerText = guess.toUpperCase() + " has been guessed";
            gameElements.incorrectGuess.style.display = "block";
        }
    }
}
 
     function compareLetter(event) {
         var alphaNumeric = /^[0-9a-zA-Z]+$/;
         var letterGuess = "";
         if (event.key.match(alphaNumeric) && event.key.length === 1) {
             letterGuess = event.key;
         } else {
             gameElements.incorrectGuess.innerText = event.key + " is not a valid entry";
             gameElements.incorrectGuess.style.display = "block";
             return;    
         }
         gameElements.incorrectGuess.style.display = "none";
         
         processGuess(letterGuess);
     }
 
     function checkProgress() {
         if (gameStats.consoleArr.join("") === gameStats.chosenWord.join("")) {
             gameElements.gameOver.innerText = "You Win!";
             gameElements.displayAlerts();
             window.removeEventListener("keyup", playGame);
             startGame();
         } else if (gameStats.remainingGuesses === 0) {
             gameStats.losses++;
             gameElements.gameOver.innerText = "You Lose!";
             gameElements.displayAlerts();
             gameElements.displayAnswer();
             window.removeEventListener("keyup", playGame);
             startGame();
         } else {
             return;
         }
     }

  function playGame(event) {
      compareLetter(event);
      checkProgress();
  }

  function startGame() {
    window.addEventListener("keyup", gameSetUp);
  }

  startGame();

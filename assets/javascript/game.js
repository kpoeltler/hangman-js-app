
generateWord => {
let wordBank = ["Blackhole", "quasars", "asteroid", "galaxy", "eclipse"];
let randomIndex = Math.floor(Math.random()* wordBank.length);
return wordBank[randomIndex].toLowerCase().split("");
};

let gameStats = {
    chosenWord: [],
    lettersGuessed: [],
    remainingGuesses: 10,
    consoleArr:[],

    createConsoleHTML: function() {
        let consoleArrHTML ="";
        this.consoleArr.forEach(function(space){
            if (space==="_") {
                consoleArrHTML += "<div class='letter-space'><img class='blank-space' src='assets/images/telescope.jpg'/></div>";
            }else {
                consoleArrHTML += "<div class= 'letter-space'>" + space.toUpperCase() + "</div>";
            }
        });
        return consoleArrHTML;
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

let gameElements = {
    word: document.querySelector("#word_to_guess"),
    remainingGuesses:document.querySelector("#remaining_guesses"),
    lettersGuessed:document.querySelector("#letters_guessed"),
    gameOver:document.querySelector("#game_over"),
    promptToStart:document.querySelector("#prompt_to_start"),
    incorrectGuess:document.querySelector("#incorrect_guess"),

resetWord: function(){
    this.word.innerHTML = gameStats.createConsole ();
    this.remainingGuesses.innerText = gameStats.remainingGuesses;
    this.lettersGuessed.innerText = gameStats.lettersGuessed;
},

updateLetterCorrect: function() {
    this.word.innerHTML = gameStats.createConsole ();
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

gameSetUp => {
    gameElements.prompStart.style.display = "none";
    gameElements.gameOver.style.display = "none";
    gameStats.resetStats();
    gameElements.resetWord();
    window.removeEventListener("keyup", gameSetUp);
    window.addEventListener("keyup", playGame);
}

processGuess=(guess)=>{
    if (gameStats.chosenWord.includes(guess) && ! gameStats.lettersGuessed.includes (guess)) {
        let arrOfIndex = [];
        gameStats.chosenWord.forEach(function(letter, index){
            if (letter === guess) {
         arrOfIndex.push(index);
            }
        });
        arrOfIndex.forEach(function(i){
            gameStats.display[i] = guess;
        });
        gameStats.lettersGuessed.push(guess);
        gameElements.updateLetterCorrect();
    } else {
        if (!gameStats.lettersGuessed.includes(guess)) {
            gameStats.remainingGuesses--;
            gameStats.lettersGuessed.push(guess);
            gameElements.updateLetterIncorrect();
        } else {
            gameElemetns.incorrectEntry.innerText = guess.toUpperCase() + " has been guessed";
            gameElements.incorrectEntry.style.display = "block";
        }
    }
}
 
     compareLetter = event => {
         let alphaNumeric = /^[0-9a-zA-Z]+$/;
         let letterGuess = "";
         
     }



}

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
}
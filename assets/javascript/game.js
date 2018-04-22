
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
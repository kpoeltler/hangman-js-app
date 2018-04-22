
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
                consoleArrHTML += "<div class= 'letter-space'>
            }
        })
    }
}
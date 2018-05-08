function generateWord() {
  var wordBank = [
    "corona",
    "solar",
    "obscuration",
    "penumbra",
    "partial",
    "totality",
    "umbra"
  ];
  var randomIndex = Math.floor(Math.random() * wordBank.length);
  return wordBank[randomIndex].toLowerCase().split("");
}

var gameStats = {
  chosenWord: [],
  lettersGuessed: [],
  remainingGuesses: 6,
  wins: 0,
  losses: 0,
  consoleArr: [],
  createGameSpace: 
  function() {
    var consoleGameArr = "";
    this.consoleArr.forEach(function(space) {
      if (space === "_") {
        consoleGameArr +=
          "<div class='letter_space'><img class='blank_space' src='assets/images/eclipse.png' alt='telescope'height='100' width='87' /></div>";
      } else {
        consoleGameArr +=
          "<div class='letter_space correct-letter'>" +
          space.toUpperCase() +
          "</div>";
      }
    });
    return consoleGameArr;
  },
  resetStats: 
  function() {
    this.chosenWord = generateWord();
    this.lettersGuessed = [];
    this.remainingGuesses = 6;
    this.consoleArr = this.chosenWord.map(function(letter) {
      return "_";
    });
  }
};

var gameElements = {
  word: document.querySelector("#word_to_guess"),
  wins: document.querySelector("#wins"),
  losses: document.querySelector("#losses"),
  remainingGuesses: document.querySelector("#remaining_guesses"),
  lettersGuessed: document.querySelector("#letters_guessed"),
  gameOver: document.querySelector("#game_over"),
  promptStart: document.querySelector("#prompt_to_start"),
  incorrectGuess: document.querySelector("#incorrect_guess"),
  resetWordHTML: 
  function() {
    this.word.innerHTML = gameStats.createGameSpace();
    this.remainingGuesses.innerText = gameStats.remainingGuesses;
    this.lettersGuessed.innerText = gameStats.lettersGuessed;
  },
  updateHTMLCorrect: 
  function() {
    this.word.innerHTML = gameStats.createGameSpace();
    this.lettersGuessed.innerText = gameStats.lettersGuessed
      .join(", ")
      .toUpperCase();
  },
  updateHTMLIncorrect: 
  function() {
    this.remainingGuesses.innerText = gameStats.remainingGuesses;
    this.lettersGuessed.innerText = gameStats.lettersGuessed
      .join(", ")
      .toUpperCase();
  },
  updateWinLoss: 
  function() {
    this.wins.innerText = gameStats.wins;
    this.losses.innerText = gameStats.losses;
  },
  displayAlerts: 
  function() {
    this.gameOver.style.display = "block";
    this.promptStart.style.display = "block";
  },
  displayAnswer: 
  function() {
    function createAnswerHTML() {
      var answerHTML = "";
      gameStats.chosenWord.forEach(function(space) {
        answerHTML +=
          "<div class='letter_space correct-letter'>" +
          space.toUpperCase() +
          "</div>";
      });
      return answerHTML;
    }
    this.word.innerHTML = createAnswerHTML();
  }
};

/** Displays the initial and final setup for the game. */
function gameSetUp() {
  gameElements.promptStart.style.display = "none";
  gameElements.gameOver.style.display = "none";
  gameStats.resetStats();
  gameElements.resetWordHTML();
  window.removeEventListener("keyup", gameSetUp);
  window.addEventListener("keyup", playGame);
}
/** compares the guessed letter to the chosenWord.
 * Takes the user's letter guess as a parameter.
  */
function processGuess(guess) {
  if (
    gameStats.chosenWord.includes(guess) &&
    !gameStats.lettersGuessed.includes(guess)
  ) {
    var arrOfIndex = [];
    gameStats.chosenWord.forEach(function(letter, index) {
      if (letter === guess) {
        arrOfIndex.push(index);
      }
    });

    arrOfIndex.forEach(function(i) {
      gameStats.consoleArr[i] = guess;
    });
    gameStats.lettersGuessed.push(guess);
    gameElements.updateHTMLCorrect();
  } else {
    if (!gameStats.lettersGuessed.includes(guess)) {
      gameStats.remainingGuesses--;
      gameStats.lettersGuessed.push(guess);
      gameElements.updateHTMLIncorrect();
    } else {
      gameElements.incorrectGuess.innerText =
        guess.toUpperCase() + " has been guessed";
      gameElements.incorrectGuess.style.display = "block";
    }
  }
}

// /** Takes one parameter and compares it  parameter   */
compareLetter = event => {
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
};

function checkProgress() {
  if (gameStats.consoleArr.join("") === gameStats.chosenWord.join("")) {
    gameStats.wins++;
    gameElements.gameOver.innerText = "You Win!";
    gameElements.displayAlerts();
    gameElements.updateWinLoss();
    window.removeEventListener("keyup", playGame);
    startGame();
  } else if (gameStats.remainingGuesses === 0) {
    gameStats.losses++;
    gameElements.gameOver.innerText = "You Lose!";
    gameElements.displayAlerts();
    gameElements.displayAnswer();
    gameElements.updateWinLoss();
    window.removeEventListener("keyup", playGame);
    startGame();
  } else {
    return;
  }
}

playGame = event => {
  compareLetter(event);
  checkProgress();
};

function startGame() {
  window.addEventListener("keyup", gameSetUp);
}

startGame();
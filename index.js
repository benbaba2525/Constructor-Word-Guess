var Word = require("./word.js");
var inquirer = require("inquirer");
var chalk = require('chalk');

var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRS";

//   List of the 15 most populous countries with a density of population  
var wordChoices = [
    "china",
    "india",
    "usa",
    "indonesia",
    "brazil",
    "pakistan",
    "nigeria",
    "bangladesh",
    "russia",
    "mexico",
    "japan",
    "philippines",
    "ethiopia",
    "egypt",
    "vietnam"
];
var randomWordChoices = wordChoices[Math.floor(Math.random() * wordChoices.length)];
//Pass random word through word constructor
var computerWord = new Word(randomWordChoices);
var requireNewWord = false;

// Array for guessed letters
// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function startGame() {
  console.log(chalk.yellow("\n=================================================================\n"));
  console.log(chalk.yellow("Guess the 15 most populous countries with a density of population"));
  console.log(chalk.yellow("\n=================================================================\n"));
}

function theLogic() {
  // Generates new word for Word constructor if true
  if (requireNewWord) {
    // Selects random wordChoices array
    var randomWordChoices = wordChoices[Math.floor(Math.random() * wordChoices.length)];

    // Passes random word through the Word constructor
    computerWord = new Word(randomWordChoices);

    requireNewWord = false;
  }

  // TestS if a letter guessed is correct
  var wordComplete = [];
  computerWord.wordArray.forEach(completeCheck);

  // letters remaining to be guessed
  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Guess a letter between A-Z!",
          name: "userinput"
        }
      ])
      .then(function(input) {
        if (
          !alphabet.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log(chalk.blue("\nPlease try again!\n"));
          theLogic();
        } else {
          if (
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log(chalk.blue("\nAlready Guessed or Nothing Entered\n"));
            theLogic();
          } else {
            // Checks if guess is correct
            var wordCheckArray = [];

            computerWord.userGuess(input.userinput);

            // Checks if guess is correct
            computerWord.wordArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log(chalk.red("\nIncorrect\n"));

              incorrectLetters.push(input.userinput);
              guessesLeft--;
            } else {
              console.log(chalk.green("\nCorrect!\n"));

              correctLetters.push(input.userinput);
            }

            computerWord.log();

            // Print guesses left
            console.log("Guesses Left: " + guessesLeft + "\n");

            // Print letters guessed already
            console.log(
              "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
            );

            // Guesses left
            if (guessesLeft > 0) {
              // Call function
              theLogic();
            } else {
              console.log(chalk.red("Sorry, you lose!\n"));

              restartGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log(chalk.green("YOU WIN!\n"));

    restartGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "Play Again") {
        requireNewWord = true;
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        theLogic();
      } else {
        return;
      }
    });
}
startGame();
theLogic();
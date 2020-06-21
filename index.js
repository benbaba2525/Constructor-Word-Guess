
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
//Random the word answer
var randomWordChoices = wordChoices[Math.floor(Math.random() * wordChoices.length)];
//Pass random word through word constructor
var computerWord = new Word(randomWordChoices);
var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

// Start the Game
function startGame() {
  console.log(chalk.yellow("\n=================================================================\n"));
  console.log(chalk.yellow("Guess the 15 most populous countries with a density of population"));
  console.log(chalk.yellow("\n=================================================================\n"));
}


function runGame() {
  // Generates new word for Word constructor if true
  if (requireNewWord) {
    // Selects random wordChoices array
    randomWordChoices = wordChoices[Math.floor(Math.random() * wordChoices.length)];
    // Passes random word through the Word constructor
    computerWord = new Word(randomWordChoices);
    requireNewWord = false;
  }


  // Check if a letter guessed is correct
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
          //Check if alphabet is not in between A-Z
          !alphabet.includes(input.userinput) ||
          input.userinput.length > 1
        ) {
          console.log(chalk.blue("\n Need to enter a letter between A-Z , Please try again!!\n"));
          runGame();
        } else {
          if (
            //Check if user guessed the latter that already guessed or user didn't enter any latter
            incorrectLetters.includes(input.userinput) ||
            correctLetters.includes(input.userinput) ||
            input.userinput === ""
          ) {
            console.log(chalk.blue("\nAlready Guessed or Nothing Entered\n"));
            runGame();
          } else {
            // Checks if guess is correct
            var wordCheckArray = [];
            computerWord.userGuess(input.userinput);

            // Checks if guess is correct or incorrect
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
            console.log("Guesses Left: " + chalk.red(guessesLeft) + "\n");

            // Print letters guessed already
            console.log(
              "Letters Guessed: " + chalk.red(incorrectLetters.join(" "))+ "\n");

            // Guesses left
            if (guessesLeft > 0) {
           //Call to runGame
              runGame();
            } else {
              console.log(chalk.red("Sorry, you lose!!\n"));

              console.log(chalk.green("The answer is " + '"'+randomWordChoices+'"\n'));
              restartGame();
            }
            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log(chalk.green("YOU WIN!!\n"));
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
        runGame();;
      } else {
        return;
      }
    });
}
startGame();
runGame();


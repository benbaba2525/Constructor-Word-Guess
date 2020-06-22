
var Word = require("./word.js");
var inquirer = require("inquirer");
var chalk = require('chalk');
var alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRS";

//   List of the 15 most populous countries with a density of population  
var wordChoices = [
  [
    "TAXI",
    "Yellow car in New York City"
  ],
  [
    "BACK",
    "Front and _ _ _ _"
  ],
  [
  "KITTEN",
  "Cute little baby cat"
  ],
  [
  "NEXT",
  "Immediately following in order"
  ],
  [
  "UNICORN",
  "Fastasy horned horse"
  ],
  [
  "PRINCE",
  "Son of a King, Charming"
  ],
  [
  "REPORT",
  "_ card, a list of grades"
  ],
  [
  "JOKER",
  "Clown, or jester playing card"
  ],
  [
  "POPCORN",
  "Popular cinema snack"
  ],
  [
  "UFO",
  "Alien spaceship"
  ]
    
];
//Random the word answer
randomWordChoices = wordChoices[Math.floor(Math.random() * wordChoices.length)];
//Pass random word through word constructor
var computerWord = new Word(randomWordChoices[0]);
var hintWord = randomWordChoices[1];
var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

// Start the Game
function startGame() {
  console.log(chalk.yellow("\n=================================================================\n"));
  console.log(chalk.yellow("                      Guess The Word !!!                    "));
  console.log(chalk.yellow("\n=================================================================\n"));
  console.log(chalk.yellow("\nHint!! : "+ hintWord+"\n"));
}


function runGame() {
  // Generates new word for Word constructor if true
  if (requireNewWord) {
  // Selects random wordChoices array
  randomWordChoices = wordChoices[Math.floor(Math.random() * wordChoices.length)];
  // Passes random word through the Word constructor
  computerWord = new Word(randomWordChoices[0]);
  var hintWord = randomWordChoices[1];
  requireNewWord = false;
 //Show hint word
 console.log(chalk.yellow("\nHint!! : "+ hintWord+"\n"));

    
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
              console.log(chalk.red("SORRY, YOU LOSE!!\n"));

              console.log(chalk.green("The answer is " + '" '+randomWordChoices[0]+' "\n'));
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


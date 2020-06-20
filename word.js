
var Letter = require("./letter.js");
var chalk = require('chalk');

var Word = function(answer){
    this.wordArray = [];

    for (var i = 0; i < answer.length; i++){
        var letter = new Letter(answer[i]);
        this.wordArray.push(letter);
    }
    this.log = function() {
        answerLog = "";
        for (var i = 0; i < this.wordArray.length; i++) {
          answerLog += this.wordArray[i] + " ";
        }
        console.log(chalk.yellow(answerLog + "\n========================================\n"));
      };

this.userGuess = function(input){
    for (var i = 0; i < this.wordArray.length; i++){
        this.wordArray[i].guess(input);
    }
};

}

module.exports = Word;
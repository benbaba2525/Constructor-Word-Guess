# Constructor-Word-Guess

# Overview
Word Guess game is a Node.js command-line application that using constructor and interactive prompts functions. 

## Instructions

There are three files:

1. Letter.js: Contains a constructor, Letter. This constructor should be able to either display an underlying character or a    blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the      constructor should define:

   A string value to store the underlying character for the letter
   A boolean value that stores whether that letter has been guessed yet
   A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if    the letter has not been guessed
   A function that takes a character as an argument and checks it against the underlying character, updating the stored        boolean value to true if it was guessed correctly

2. Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object              representing the current word the user is attempting to guess. That means the constructor should define:

   An array of new Letter objects representing the letters of the underlying word
   A function that returns a string representing the word. This should call the function on each letter object (the first      function defined in Letter.js) that displays the character or an underscore and concatenate those together.
   A function that takes a character as an argument and calls the guess function on each letter object (the second function    defined in Letter.js)

3. index.js: The file containing the logic for the course of the game, which depends on Word.js and:
   Randomly selects a word and uses the Word constructor to store it
   Prompts the user for each guess and keeps track of the user's remaining guesses

##

![alt-spotify-this-song](https://raw.githubusercontent.com/benbaba2525/Constructor-Word-Guess/master/ezgif.com-video-to-gif.gif)



## Authors
  - Kanyarut Pornamnuay
  <br><a target="_blank" rel="nofollow" href="https://github.com/benbaba2525">Visit My Github Profile</a>
  <br><a target="_blank" rel="nofollow" href="https://www.kanyarut.me/">Visit My Portfolio</a>


## Acknowledgments
  - UCLA Coding Bootcamp   <a target="_blank" rel="nofollow" href="https://bootcamp.uclaextension.edu/coding/">Visit UCLA Coding Bootcamp</a>

## Helpful Link

  - <a target="_blank" rel="nofollow" href="https://nodejs.dev/learn">Learn Node.js</a>
  - <a target="_blank" rel="nofollow" href="https://developer.mozilla.org/enUS/docs/Web/JavaScript/Reference/Classes/constructor">Constructor Docs</a>
  - <a target="_blank" rel="nofollow" 
  href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor">Prototype Docs</a>
  - <a target="_blank" rel="nofollow" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this">This Keyword</a>
  - <a target="_blank" rel="nofollow" href="https://www.npmjs.com/package/inquirer/v/0.2.3">InquirerJS</a>


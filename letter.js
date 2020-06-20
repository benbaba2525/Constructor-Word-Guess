var Letter = function(value){
    
    this.letter = value;
    this.guessed = false;

    this.toString = function(){
        if (this.letter === " "){
            this.guessed = true;
            return " ";
        }else{
            if(this.guessed === false){
                return "_";
            }else{
                return this.letter
            }
        }
    }

    this.guess = function(guess){
        if (guess.toLowerCase() === this.letter.toLowerCase()){
            this.guessed = true;
        }
    }
}

module.exports = Letter;

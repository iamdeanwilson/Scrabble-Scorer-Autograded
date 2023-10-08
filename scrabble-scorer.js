// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let word = '';

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
   console.log(letterPoints);
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let alphabet = " abcdefghijklmnopqrstuvwxyz";
  word = input.question("Let's play some scrabble! \n\nEnter a word to score: ");
  word = word.toLowerCase(); 
  for (let i=0 ; i < word.length ; i++){
    if (alphabet.indexOf(word[i]) === -1){
    console.log('Invalid Entry. Only letters are allowed.')
    return initialPrompt();
    }
  } 
  return word
};

let simpleScorer = function(word){
   let alphabet = "abcdefghijklmnopqrstuvwxyz";
   word = word.toLowerCase();
   let score = 0;
   for (let i=0 ; i < word.length ; i++){
     if (alphabet.indexOf(word[i]) !== -1){
       score++
     }
   }
   return score;
 } 

let vowelBonusScorer = function(word){
   let consonants = "bcdfghjklmnpqrstvwxyz";
   let vowels = "aeiou";
   word = word.toLowerCase();
   let score = 0;
   for (let i=0 ; i < word.length ; i++){
     if (vowels.indexOf(word[i]) !== -1){
       score +=3
     } else if (consonants.indexOf(word[i]) !== -1){
       score ++
     }
   }
   return score;
 }
 

let newPointStructure = transform(oldPointStructure)
newPointStructure[' '] = 0;

let scrabbleScorer = function(word) {
	word = word.toLowerCase();
	let score = 0;
	for (let i = 0; i < word.length; i++) {
    score += newPointStructure[word[i]]
	}
	return score;
 }

const scoringAlgorithms = [
  {
    'name': 'Simple Score',
    'description': 'Each letter is worth 1 point.',
    'scorerFunction': simpleScorer
  },
  {
    'name': 'Bonus Vowels',
    'description': 'Vowels are 3 pts, consonants are 1 pt.',
    'scorerFunction': vowelBonusScorer
  },
  {
    'name': 'Scrabble',
    'description': 'The traditional scoring algorithm.',
    'scorerFunction': scrabbleScorer
  }
];

function scorerPrompt(word) {
   let scoring;
   scoring = Number(input.question('\nWhich scoring algorithm would you like to use? \n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points \n2 - Scrabble: Uses scrabble point system \nEnter 0, 1, or 2: '));
   let scoringOptions = [0,1,2];  
   if (scoringOptions.indexOf(scoring) === -1){
       console.log('\nInvalid Entry.');
       scorerPrompt(word)
   } else if(scoring === 0 | scoring === 1 | scoring === 2){
   console.log(`Using the ${scoringAlgorithms[scoring].name} Scorer, ${word} is worth ${scoringAlgorithms[scoring].scorerFunction(word)} points.`);
   return scoringAlgorithms.scorerFunction;
   }
 }

function transform(oldPointStructure) {
   let newObj = {};
   for (number in oldPointStructure){
     for (let i=0 ; i < oldPointStructure[number].length ; i++){
       newObj[oldPointStructure[number][i].toLowerCase()] = Number(number);
     }
   }
   return newObj;
 };

function runProgram() {
   initialPrompt();
   scorerPrompt(word);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

// New Point Structure after using Transform Function:
//   a: 1,
//   e: 1,
//   i: 1,
//   o: 1,
//   u: 1,
//   l: 1,
//   n: 1,
//   r: 1,
//   s: 1,
//   t: 1,
//   d: 2,
//   g: 2,
//   b: 3,
//   c: 3,
//   m: 3,
//   p: 3,
//   f: 4,
//   h: 4,
//   v: 4,
//   w: 4,
//   y: 4,
//   k: 5,
//   j: 8,
//   x: 8,
//   q: 10,
//   z: 10
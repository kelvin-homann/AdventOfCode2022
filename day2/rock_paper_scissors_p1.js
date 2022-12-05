const fs = require("fs");

const inputFile = fs.readFileSync("day2/input.txt", "utf8");
const items = inputFile.split("\n");

// First row: Opponent will play this
// A for Rock
// B for Paper
// C for Scissors

// Second row: What my response should be:
// X for Rock
// Y for Paper
// Z for Scissors

// Rock: 1 Point
// Paper: 2 Points
// Scissors: 3 Points

// The winner of the whole tournament is the player with the highest score.
// Your total score is the sum of your scores for each round.
// The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors)
// plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won).

const keys = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
};

const convertedItems = items.map((item) => {
  return item.split(" ").map((i) => keys[i]);
});

const scores = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const outcomes = {
  Rock: {
    Rock: 3,
    Paper: 0,
    Scissors: 6,
  },
  Paper: {
    Rock: 6,
    Paper: 3,
    Scissors: 0,
  },
  Scissors: {
    Rock: 0,
    Paper: 6,
    Scissors: 3,
  },
};

const calculateScore = (item) => {
  const [opponent, response] = item;
  const score = scores[response] + outcomes[response][opponent];
  return score;
};

const totalScore = convertedItems.reduce((acc, item) => {
  return acc + calculateScore(item);
}, 0);

console.log(totalScore);

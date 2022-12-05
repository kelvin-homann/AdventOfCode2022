const fs = require("fs");

const inputFile = fs.readFileSync("day2/input.txt", "utf8");
const items = inputFile.split("\n");

// First row: Opponent will play this
// A for Rock
// B for Paper
// C for Scissors

// Second row: How the round needs to end
// X to loose the round
// Y to draw the round
// Z to win the round

// Rock: 1 Point
// Paper: 2 Points
// Scissors: 3 Points

// The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:

// In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
// In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
// In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
// Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.

// Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?

const scores = {
  A: 1,
  B: 2,
  C: 3,
};

const outcomes = {
  A: {
    A: 3,
    B: 0,
    C: 6,
  },
  B: {
    A: 6,
    B: 3,
    C: 0,
  },
  C: {
    A: 0,
    B: 6,
    C: 3,
  },
};

const calculateScore = (shape, response) => {
  const score = scores[shape] + outcomes[response][shape];
  return score;
};

const chooseShape = (item) => {
  const [opponent, response] = item;
  const drawShape = Object.keys(outcomes).find((shape) => {
    switch (response) {
      case "X":
        return outcomes[shape][opponent] === 0;
      case "Y":
        return outcomes[shape][opponent] === 3;
      case "Z":
        return outcomes[shape][opponent] === 6;
    }
  });
  return drawShape;
};

// const calculateTotalScore = (items) => {
//   const totalScore = items.reduce((acc, item) => {
//     const score = calculateScore(item);
//     return acc + score;
//   }, 0);
//   return totalScore;
// };

const calculateTotalScoreWithShape = (items) => {
  const totalScore = items.reduce((acc, item) => {
    const [shape, response] = item.split(" ");
    console.log(shape, response);
    const score = calculateScore(shape, response);
    return acc + score;
  }, 0);
  return totalScore;
};

const totalScore = calculateTotalScoreWithShape(items);

console.log(totalScore);

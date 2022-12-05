const fs = require("fs");

class Elf {
  snacks = [];

  constructor(items) {
    this.snacks = items;
  }

  getTotalCalories() {
    return this.snacks.reduce(
      (partialSum, calories) => partialSum + calories,
      0
    );
  }
}

const inputFile = fs.readFileSync("day1/input.txt", "utf8");
const snackItems = inputFile.split("\n");

const snackItemsSlices = [];
let currentSlice = [];

snackItems.forEach((snack) => {
  if (snack.length === 0) {
    snackItemsSlices.push(currentSlice);
    currentSlice = [];
  } else {
    currentSlice.push(parseInt(snack));
  }
});

const elves = snackItemsSlices.map((slice) => new Elf(slice));

const highestCalories = elves.reduce(
  (highest, elf) => Math.max(highest, elf.getTotalCalories()),
  0
);

// part 1
console.log("Highest Calories:", highestCalories);

const top3Elves = elves
  .map((elf) => elf.getTotalCalories())
  .sort((a, b) => b - a)
  .slice(0, 3);

const sum = top3Elves.reduce(
  (partialSum, calories) => partialSum + calories,
  0
);

// part 2
console.log("Top 3 Highest Calories total:", sum);

const fs = require("fs");

const array = fs
  .readFileSync("day10.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split(""));

const openingBlocks = {
  "(": { closing: ")", score: 1 },
  "[": { closing: "]", score: 2 },
  "{": { closing: "}", score: 3 },
  "<": { closing: ">", score: 4 },
};

const closingBlocks = {
  ")": { opening: "(", score: 3 },
  "]": { opening: "[", score: 57 },
  "}": { opening: "{", score: 1197 },
  ">": { opening: "<", score: 25137 },
};

const myFunction = (array) => {
  let score = 0;

  for (let i = 0; i < array.length; i++) {
    const horizontal = array[i];

    let openBlocks = [];

    for (let x = 0; x < horizontal.length; x++) {
      const symbol = horizontal[x];

      if (Object.keys(openingBlocks).includes(symbol)) {
        openBlocks.push(symbol);
      }

      if (Object.keys(closingBlocks).includes(symbol)) {
        const isNotClosed =
          closingBlocks[symbol].opening !== openBlocks[openBlocks.length - 1];

        if (isNotClosed) {
          score += closingBlocks[symbol].score;
          break;
        } else {
          openBlocks.pop();
        }
      }
    }
  }

  return score;
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const median = (array) => {
  let middle = Math.floor(array.length / 2);

  array = [...array].sort((a, b) => a - b);

  const result =
    array.length % 2 !== 0
      ? array[middle]
      : (array[middle - 1] + array[middle]) / 2;

  return result;
};

const myFunction2 = (array) => {
  const incompleteLinesScores = [];

  for (let i = 0; i < array.length; i++) {
    const horizontal = array[i];

    let openBlocks = [];

    let lineIsCorrupted = false;

    for (let x = 0; x < horizontal.length; x++) {
      const symbol = horizontal[x];

      if (Object.keys(openingBlocks).includes(symbol)) {
        openBlocks.push(symbol);
      }

      if (Object.keys(closingBlocks).includes(symbol)) {
        const isNotClosed =
          closingBlocks[symbol].opening !== openBlocks[openBlocks.length - 1];

        if (isNotClosed) {
          lineIsCorrupted = true;
          break;
        } else {
          openBlocks.pop();
        }
      }
    }

    if (!lineIsCorrupted) {
      incompleteLinesScores.push(
        [...openBlocks]
          .reverse()
          .map((opening) => openingBlocks[opening].score)
          .reduce((acc, curr) => 5 * acc + curr, 0)
      );
    }
  }

  return median(incompleteLinesScores);
};

const value2 = myFunction2(array);

console.log(value2);

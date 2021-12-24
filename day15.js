const fs = require("fs");

const array = fs
  .readFileSync("day15.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split("").map(Number));

const backFill = (array, grid, i, j) => {
  const v = grid[i][j];

  if (j > 0 && v + array[i][j - 1] < grid[i][j - 1]) {
    grid[i][j - 1] = v + array[i][j - 1];

    backFill(array, grid, i, j - 1);
  }

  if (i > 0 && v + array[i - 1][j] < grid[i - 1][j]) {
    grid[i - 1][j] = v + array[i - 1][j];

    backFill(array, grid, i - 1, j);
  }

  if (
    j < array[0].length - 1 &&
    grid[i][j + 1] &&
    v + array[i][j + 1] < grid[i][j + 1]
  ) {
    grid[i][j + 1] = v + array[i][j + 1];

    backFill(array, grid, i, j + 1);
  }

  if (
    i < array.length - 1 &&
    grid[i + 1] &&
    grid[i + 1][j] &&
    v + array[i + 1][j] < grid[i + 1][j]
  ) {
    grid[i + 1][j] = v + array[i + 1][j];

    backFill(array, grid, i + 1, j);
  }
};

const getLowerPath = (array) => {
  let totalRisk = [];

  array.forEach((row, i) => {
    let r = [];

    totalRisk.push(r);

    row.forEach((col, j) => {
      let lowestPath;

      if (i === 0) {
        lowestPath = r[j - 1];
      } else if (j === 0) {
        lowestPath = totalRisk[i - 1][0];
      } else {
        lowestPath = Math.min(r[j - 1], totalRisk[i - 1][j]);
      }

      r[j] = i === 0 && j === 0 ? 0 : lowestPath + col;

      if (i > 0 && j > 0) {
        backFill(array, totalRisk, i, j);
      }
    });
  });
  return totalRisk;
};

const myFunction = (array) => {
  const totalRisk = getLowerPath(array);

  return totalRisk[totalRisk.length - 1][totalRisk[0].length - 1];
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const bigCave = (array) => {
  const bigGrid = [];

  for (let i = 0; i < 5; i++) {
    for (let r = 0; r < array.length; r++) {
      let bigRow = [];

      for (let j = 0; j < 5; j++) {
        const offset = i + j;

        const row = array[r].map((element) => {
          element += offset;

          return element > 9 ? element - 9 : element;
        });
        bigRow = bigRow.concat(row);
      }
      bigGrid.push(bigRow);
    }
  }
  return bigGrid;
};

const myFunction2 = (array) => {
  const bigGrid = bigCave(array);

  const totalRisk = getLowerPath(bigGrid);

  return totalRisk[totalRisk.length - 1][totalRisk[0].length - 1];
};

const value2 = myFunction2(array);

console.log(value2);

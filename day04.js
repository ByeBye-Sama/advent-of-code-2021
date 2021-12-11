const fs = require("fs");

const array = fs
  .readFileSync("day04.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => {
    const value = x
      .replace(/[\n ,]+/g, " ")
      .trim()
      .split(" ")
      .map((y) => parseInt(y));

    return value;
  });

const isBingo = (grid) => {
  let bingo = false;

  for (let i = 0; i < grid.length; i++) {
    if (!bingo) {
      let bingoOnRow = true;

      grid[i].forEach((numberOnRow) => {
        if (numberOnRow !== "x") {
          bingoOnRow = false;
        }
      });

      bingo = bingoOnRow;
    }
  }

  for (let i = 0; i < grid[0].length; i++) {
    if (!bingo) {
      let bingoOnColumn = true;

      grid.forEach((row) => {
        if (row[i] !== "x") {
          bingoOnColumn = false;
        }
      });

      bingo = bingoOnColumn;
    }
  }

  return bingo;
};

const myFunction = (array) => {
  const [drawnPool, ...rest] = array;

  let grids = [];
  let someoneWin = false;
  let winningGrid;
  let winningNumber;
  let sum = 0;

  for (let i = 0; i < rest.length; i += 5) {
    grids.push(rest.slice(i, i + 5));
  }

  drawnPool.forEach((numberChoosen) => {
    if (!someoneWin) {
      for (let i = 0; i < grids.length; i++) {
        for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
          for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
            if (grids[i][rowIndex][columnIndex] === numberChoosen) {
              grids[i][rowIndex][columnIndex] = "x";
            }
          }
        }
      }
      grids.forEach((grid) => {
        if (isBingo(grid)) {
          someoneWin = true;
          winningGrid = grid;
          winningNumber = numberChoosen;
        }
      });
    }
  });

  winningGrid.flat(1).forEach((numberChoosen) => {
    if (numberChoosen !== "x") {
      sum += numberChoosen;
    }
  });

  return sum * winningNumber;
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const myFunction2 = (array) => {
  const [drawnPool, ...rest] = array;

  let grids = [];
  let someoneWin = false;
  let winningGrid;
  let winningNumber;
  let sum = 0;

  for (let i = 0; i < rest.length; i += 5) {
    grids.push(rest.slice(i, i + 5));
  }

  drawnPool.forEach((numberChoosen) => {
    if (!someoneWin) {
      for (let i = 0; i < grids.length; i++) {
        for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
          for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
            if (grids[i][rowIndex][columnIndex] === numberChoosen) {
              grids[i][rowIndex][columnIndex] = "x";
            }
          }
        }
      }

      for (let i = 0; i < grids.length; i++)
        if (isBingo(grids[i]) && grids.length > 1) {
          grids.splice(i, 1);
        } else if (isBingo(grids[i]) && grids.length === 1) {
          someoneWin = true;
          winningGrid = grids[i];
          winningNumber = numberChoosen;
        }
    }
  });

  winningGrid.flat(1).forEach((numberChoosen) => {
    if (numberChoosen !== "x") {
      sum += numberChoosen;
    }
  });

  return sum * winningNumber;
};

const value2 = myFunction2(array);

console.log(value2);

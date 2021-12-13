const fs = require("fs");

const array = fs
  .readFileSync("day11.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split("").map(Number));

const get = (obj, path, defValue) => {
  if (!path) return undefined;

  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

  const result = pathArray.reduce(
    (prevObj, key) => prevObj && prevObj[key],
    obj
  );

  return result === undefined ? defValue : result;
};

const flash = ({ grid, x, y, flashed }) => {
  flashed.add(`${x},${y}`);

  grid[y][x] = 0;

  [-1, 0, 1].forEach((dy) => {
    [-1, 0, 1].forEach((dx) => {
      if (
        get(grid, [y + dy, x + dx], Infinity) <= 9 &&
        !flashed.has(`${x + dx},${y + dy}`)
      ) {
        grid[y + dy][x + dx] += 1;

        if (grid[y + dy][x + dx] === 10) {
          flash({ grid, x: x + dx, y: y + dy, flashed });
        }
      }
    });
  });

  return grid;
};

const addStep = (grid) => {
  let flashed = new Set();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      grid[y][x]++;
    }
  }

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 10) {
        flash({ grid, x, y, flashed });
      }
    }
  }

  return flashed;
};

const myFunction = (array) => {
  const currentGrid = JSON.parse(JSON.stringify(array));

  let totalFlashed = 0;

  let step = 0;

  while (step < 100) {
    const flashed = addStep(currentGrid);

    totalFlashed += flashed.size;

    step++;
  }

  return totalFlashed;
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const myFunction2 = (input) => {
  let step = 0;

  while (true) {
    step += 1;
    const flashed = computeStep(input, step);

    if (flashed.size === 100) {
      return step;
    }
  }
};

const value2 = myFunction2(array);

console.log(value2);

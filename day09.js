const fs = require("fs");

const array = fs
  .readFileSync("day09.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split("").map(Number));

const myFunction = (array) => {
  let total = 0;

  for (let i = 0; i < array.length; i++) {
    const horizontal = array[i];

    for (let x = 0; x < horizontal.length; x++) {
      let isLowerHorizontal;
      let isLowerVertical;

      if (x === 0) {
        isLowerHorizontal = horizontal[x] < horizontal[x + 1];
      } else if (x === horizontal.length - 1) {
        isLowerHorizontal = horizontal[x] < horizontal[x - 1];
      } else {
        isLowerHorizontal =
          horizontal[x] < horizontal[x - 1] &&
          horizontal[x] < horizontal[x + 1];
      }

      if (i === 0) {
        isLowerVertical = horizontal[x] < array[i + 1][x];
      } else if (i === array.length - 1) {
        isLowerVertical = horizontal[x] < array[i - 1][x];
      } else {
        isLowerVertical =
          horizontal[x] < array[i - 1][x] && horizontal[x] < array[i + 1][x];
      }

      if (isLowerHorizontal && isLowerVertical) {
        total += horizontal[x] + 1;
      }
    }
  }

  return total;
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const setBasinSize = (i, x, map) => {
  if (map[i][x] === 1) return 0;

  map[i][x] = 1;

  let size = 1;

  if (i - 1 >= 0) {
    size += setBasinSize(i - 1, x, map);
  }
  if (i + 1 < map.length) {
    size += setBasinSize(i + 1, x, map);
  }
  if (x - 1 >= 0) {
    size += setBasinSize(i, x - 1, map);
  }
  if (x + 1 < map[i].length) {
    size += setBasinSize(i, x + 1, map);
  }

  return size;
};

const myFunction2 = (array) => {
  const map = Array(array.length)
    .fill(0)
    .map((_, i) =>
      Array(array[0].length)
        .fill(0)
        .map((_, x) => (array[i][x] === 9 ? 1 : 0))
    );

  let basins = [];

  for (let i = 0; i < array.length; i++) {
    const horizontal = array[i];

    for (let x = 0; x < horizontal.length; x++) {
      const size = setBasinSize(i, x, map);

      if (size > 0) {
        basins.push(size);
      }
    }
  }

  basins.sort((a, b) => b - a);

  return basins[0] * basins[1] * basins[2];
};

const value2 = myFunction2(array);

console.log(value2);

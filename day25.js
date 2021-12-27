const fs = require("fs");

const array = fs
  .readFileSync("day25.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split(""));

const dir = [
  [">", 0, 1],
  ["v", 1, 0],
];

const myFunction = (array) => {
  const height = array.length;
  const width = array[0].length;

  let steps = 0;
  let moved = false;

  do {
    steps++;
    moved = false;

    for (let i = 0; i < 2; i++) {
      let g = array.map((x) => x.map((y) => y));

      for (let j = 0; j < height; j++) {
        for (let k = 0; k < width; k++) {
          if (
            g[j][k] === dir[i][0] &&
            g[(j + dir[i][1]) % height][(k + dir[i][2]) % width] === "."
          ) {
            moved = true;

            array[(j + dir[i][1]) % height][(k + dir[i][2]) % width] =
              dir[i][0];

            array[j][k] = ".";
          }
        }
      }
    }
  } while (moved);

  return steps;
};

const value = myFunction(array);

console.log(value);

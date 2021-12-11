const fs = require("fs");

const array = fs
  .readFileSync("day06.txt", { encoding: "utf-8" })
  .split(",")
  .map((x) => Number(x));

const myFunction = (array) => {
  let lanternfishes = [...array];

  for (let days = 0; days < 80; days++) {
    let newborn = 0;

    for (let i = 0; i < lanternfishes.length; i++) {
      if (lanternfishes[i] === 0) {
        lanternfishes[i] = 6;

        newborn++;
      } else {
        lanternfishes[i]--;
      }
    }

    for (let i = 0; i < newborn; i++) {
      lanternfishes.push(8);
    }
  }

  return lanternfishes.length;
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const myFunction2 = (array) => {
  const lanternfishes = Array(9).fill(0);

  for (const i of array) {
    lanternfishes[i]++;
  }

  for (let i = 0; i < 256; i++) {
    const currentFishes = lanternfishes.shift();

    lanternfishes.push(currentFishes);

    lanternfishes[6] += currentFishes;
  }

  return lanternfishes.reduce((a, b) => a + b, 0);
};

const value2 = myFunction2(array);

console.log(value2);

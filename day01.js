const fs = require("fs");

const array = fs
  .readFileSync("day01.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => Number(x));

const myFunction = (array) => {
  let total = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      total++;
    }
  }

  return total;
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const myFunction2 = (array) => {
  let total = 0;

  for (let i = 3; i < array.length; i++) {
    const first = array[i - 1] + array[i - 2] + array[i - 3];

    const second = array[i] + array[i - 1] + array[i - 2];

    if (second > first) {
      total++;
    }
  }

  return total;
};

const value2 = myFunction2(array);

console.log(value2);

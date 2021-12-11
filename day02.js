const fs = require("fs");

const array = fs
  .readFileSync("day02.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => {
    const [a, b] = x.split(" ");
    return { a, b: parseInt(b) };
  });

const myFunction = (array) => {
  let horizontal = 0;
  let vertical = 0;

  for (let i = 0; i < array.length; i++) {
    const direction = array[i].a;
    const distance = array[i].b;

    if (direction === "forward") {
      horizontal += distance;
    }

    if (direction === "up") {
      vertical -= distance;
    }

    if (direction === "down") {
      vertical += distance;
    }
  }

  return horizontal * vertical;
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const myFunction2 = (array) => {
  let horizontal = 0;
  let vertical = 0;
  let aim = 0;

  for (let i = 0; i < array.length; i++) {
    const direction = array[i].a;
    const distance = array[i].b;

    if (direction === "forward") {
      horizontal += distance;
      vertical += distance * aim;
    }

    if (direction === "up") {
      aim -= distance;
    }

    if (direction === "down") {
      aim += distance;
    }
  }

  return horizontal * vertical;
};

const value2 = myFunction2(array);

console.log(value2);

const fs = require("fs");

const array = fs
  .readFileSync("day7.txt", { encoding: "utf-8" })
  .split(",")
  .map((x) => Number(x));

const posibleSteps = (array) => {
  let crabs = [];

  const maxNumber = Math.max(...array);

  const minNumber = Math.min(...array);

  for (let i = minNumber; i < maxNumber; i++) {
    crabs.push(i);
  }

  return crabs;
};

const fuelCost = (position, number) => {
  let cost = Math.abs(position - number);

  return cost;
};

const myFunction = (array) => {
  const totalFuelCost = (pos) =>
    array.map((crab) => fuelCost(pos, crab)).reduce((x, y) => x + y, 0);

  const fuelCosts = posibleSteps(array).map((pos) => totalFuelCost(pos));

  return Math.min(...fuelCosts);
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const fuelCost2 = (position, number) => {
  let cost = Math.abs(position - number);

  let sum = 0;

  for (let i = 0; i < cost; i++) {
    sum += i;
  }

  return cost + sum;
};

const myFunction2 = (array) => {
  const totalFuelCost = (pos) =>
    array.map((number) => fuelCost2(pos, number)).reduce((x, y) => x + y, 0);

  const fuelCosts = posibleSteps(array).map((pos) => totalFuelCost(pos));

  return Math.min(...fuelCosts);
};

const value2 = myFunction2(array);

console.log(value2);

const fs = require("fs");

const array = fs
  .readFileSync("day3.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x));

const myFunction = (array) => {
  const bitLength = array[0].length;
  let zeros = Array(bitLength).fill(0);
  let ones = Array(bitLength).fill(0);
  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < array.length; i++) {
    const bits = Array.from(array[i]);

    for (let x = 0; x < bits.length; x++) {
      if (bits[x] === "0") {
        zeros[x]++;
      }

      if (bits[x] === "1") {
        ones[x]++;
      }
    }
  }

  for (let i = 0; i < bitLength; i++) {
    let gammaBit = 0;
    let epsilonBit = 0;

    if (ones[i] > zeros[i]) {
      gammaBit = 1;
      epsilonBit = 0;
    }

    if (zeros[i] > ones[i]) {
      gammaBit = 0;
      epsilonBit = 1;
    }

    gamma += gammaBit;
    epsilon += epsilonBit;
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const myFunction2 = (array) => {
  const bitLength = array[0].length;

  let zeros = Array(bitLength).fill(0);
  let ones = Array(bitLength).fill(0);

  for (let i = 0; i < array.length; i++) {
    const bits = Array.from(array[i]);

    for (let x = 0; x < bits.length; x++) {
      if (bits[x] === "0") {
        zeros[x]++;
      }

      if (bits[x] === "1") {
        ones[x]++;
      }
    }
  }

  return { zeros, ones };
};

const getOxygen = (array, i = 0) => {
  const { zeros, ones } = myFunction2(array);

  let mostCommonBit = "1";

  if (zeros[i] > ones[i]) {
    mostCommonBit = "0";
  }

  const filteredArray = array.filter((bits) => bits[i] === mostCommonBit);

  if (filteredArray.length === 1) {
    return filteredArray[0];
  }

  return getOxygen(filteredArray, i + 1);
};

const getCo2 = (array, i = 0) => {
  const { zeros, ones } = myFunction2(array);

  let leastCommonBit = "0";

  if (zeros[i] > ones[i]) {
    leastCommonBit = "1";
  }
  const filteredArray = array.filter((bits) => bits[i] === leastCommonBit);

  if (filteredArray.length === 1) {
    return filteredArray[0];
  }

  return getCo2(filteredArray, i + 1);
};

const value2 = parseInt(getOxygen(array), 2) * parseInt(getCo2(array), 2);

console.log(value2);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

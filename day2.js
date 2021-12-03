const myFunction = (array) => {
  let horizontal = 0;
  let vertical = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] === "forward") {
      horizontal += array[i];
    }

    if (array[i - 1] === "up") {
      vertical -= array[i];
    }

    if (array[i - 1] === "down") {
      vertical += array[i];
    }
  }

  return horizontal * vertical;
};

const array = [];

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const myFunction2 = (array) => {
  let horizontal = 0;
  let vertical = 0;
  let aim = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] === "forward") {
      horizontal += array[i];
      vertical += array[i] * aim;
    }

    if (array[i - 1] === "up") {
      aim -= array[i];
    }

    if (array[i - 1] === "down") {
      aim += array[i];
    }
  }

  return horizontal * vertical;
};

const array2 = [];

const value2 = myFunction2(array2);

console.log(value2);

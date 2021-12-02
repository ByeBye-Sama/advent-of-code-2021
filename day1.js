const myFunction = (array) => {
  let total = 0;

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      total++;
    }
  }

  return total;
};

const array = [];

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

const array2 = [];

const value2 = myFunction2(array2);

console.log(value2);

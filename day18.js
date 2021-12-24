const fs = require("fs");

const array = fs.readFileSync("day18.txt", { encoding: "utf-8" }).split("\n");

const oneReduction = (num) => {
  const digits = "0123456789";
  let count = 0;

  for (let i = 0; i < num.length; i++) {
    if (num[i] === "]") {
      count--;
    } else if (num[i] === "[") {
      count++;

      if (count === 5) {
        const left = parseInt(num.slice(i + 1));
        const posComma = num.indexOf(",", i);
        const right = parseInt(num.slice(posComma + 1));
        const posClose = num.indexOf("]", i);

        let l = num.slice(0, i);
        let r = num.slice(posClose + 1);

        for (let j = 0, k = 0; j < r.length; j++) {
          if (digits.includes(r[j])) {
            for (k = j + 1; k < r.length; k++) {
              if (!digits.includes(r[k])) {
                break;
              }
            }

            r = `${r.slice(0, j)}${parseInt(r.slice(j)) + right}${r.slice(k)}`;

            break;
          }
        }
        for (let j = l.length - 1, k = 0; j >= 0; j--) {
          if (digits.includes(l[j])) {
            for (k = j - 1; k >= 0; k--) {
              if (!digits.includes(l[k])) {
                break;
              }
            }

            j++;
            k++;
            l = `${l.slice(0, k)}${parseInt(l.slice(k)) + left}${l.slice(j)}`;

            break;
          }
        }
        num = `${l}0${r}`;

        return [num, true];
      }
    }
  }

  for (let i = 0; i < num.length; i++) {
    if (digits.includes(num[i])) {
      let d = parseInt(num.slice(i));

      if (d > 9) {
        const left = (d - (d % 2)) / 2;
        const right = d - left;

        for (let j = i + 1; j < num.length; j++) {
          if (!digits.includes(num[j])) {
            num = `${num.slice(0, i)}[${left},${right}]${num.slice(j)}`;

            return [num, true];
          }
        }
      }
    }
  }
  return [num, false];
};

const reducer = (number) => {
  let changed;

  do {
    [number, changed] = oneReduction(number);
  } while (changed);

  return number;
};

const magnitude = ([l, r]) => {
  const lv = Array.isArray(l) ? magnitude(l) : l;
  const rv = Array.isArray(r) ? magnitude(r) : r;

  return 3 * lv + 2 * rv;
};

const myFunction = (array) => {
  const result = array.reduce((a, r) => {
    const added = `[${a},${r}]`;

    return reducer(added);
  });
  return magnitude(JSON.parse(result));
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const myFunction2 = (array) => {
  let max = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const v1 = magnitude(JSON.parse(reducer(`[${array[i]},${array[j]}]`)));
      const v2 = magnitude(JSON.parse(reducer(`[${array[j]},${array[i]}]`)));

      max = max > v1 ? max : v1;
      max = max > v2 ? max : v2;
    }
  }
  return max;
};

const value2 = myFunction2(array);

console.log(value2);

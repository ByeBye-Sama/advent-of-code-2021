const fs = require("fs");

const array = fs
  .readFileSync("day8.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((line) => {
    const [signal, output] = line.split(" | ").map((x) =>
      x.split(" ").map((string) => {
        const segment = [...string];

        segment.sort();

        return segment.join("");
      })
    );
    return { signal, output };
  });

const myFunction = (array) => {
  let total = 0;

  for (let i = 0; i < array.length; i++) {
    const output = array[i].output;

    // 1,4,7,8 unique numbers char = 2,4,3,7
    const matches = output.filter((x) => [2, 4, 3, 7].includes(x.length));

    total += matches.length;
  }

  return total;
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const includes = (a, b) => {
  const set = new Set([...a]);

  return [...b].every((x) => set.has(x));
};

const myFunction2 = (array) => {
  let total = 0;

  for (let i = 0; i < array.length; i++) {
    const signal = array[i].signal;

    const output = array[i].output;

    const matches = {
      1: signal.find((x) => x.length === 2),
      4: signal.find((x) => x.length === 4),
      7: signal.find((x) => x.length === 3),
      8: signal.find((x) => x.length === 7),
    };

    matches[6] = signal.find((x) => x.length === 6 && !includes(x, matches[1]));

    matches[9] = signal.find(
      (x) => x.length === 6 && x !== matches[6] && includes(x, matches[4])
    );
    matches[0] = signal.find(
      (x) => x.length === 6 && x !== matches[6] && x !== matches[9]
    );

    matches[3] = signal.find((x) => x.length === 5 && includes(x, matches[1]));

    matches[5] = signal.find(
      (x) => x.length === 5 && x !== matches[3] && includes(matches[6], x)
    );

    matches[2] = signal.find(
      (x) => x.length === 5 && x !== matches[3] && x !== matches[5]
    );

    const translationTable = Object.fromEntries(
      Object.entries(matches).map((x) => x.reverse())
    );

    const translated = Number(
      output.map((signal) => translationTable[signal]).join("")
    );

    total += translated;
  }

  return total;
};

const value2 = myFunction2(array);

console.log(value2);

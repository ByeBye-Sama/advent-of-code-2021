const fs = require("fs");

const file = fs.readFileSync("day23.txt", { encoding: "utf-8" });

const reg =
  /#############\n#...........#\n###(\w)#(\w)#(\w)#(\w)###\n  #(\w)#(\w)#(\w)#(\w)#\n  #########/;

const array = file.match(reg).slice(1, 9);

const setCharAt = (str, index, chr) => {
  if (index > str.length - 1) {
    return str;
  }

  return `${str.substring(0, index)}${chr}${str.substring(index + 1)}`;
};

let record = Infinity;

const top = "...........";

const hashes = {};

const iterate = (top, cols, cost, endState) => {
  const costs = { A: 1, B: 10, C: 100, D: 1000 };
  const insertIndex = { A: 2, B: 4, C: 6, D: 8 };
  const lower = { A: "a", B: "b", C: "c", D: "d" };

  if (cost >= record) {
    return;
  }
  const reducer = (accumulator, curr) => accumulator + curr;

  const hash = top + cols.reduce(reducer);

  if (!hashes[hash] || hashes[hash] > cost) {
    hashes[hash] = cost;

    if (hash == endState) {
      record = cost;

      return;
    }

    const extract = (y, x) => {
      const from = x * 2 + 2;
      const letter = cols[x][y];

      const extractTo = (i) => {
        if (i == 2 || i == 4 || i == 6 || i == 8) {
          return;
        }

        const newTop = setCharAt(top, i, letter);
        const newCols = [...cols];

        newCols[x] = setCharAt(newCols[x], y, ".");
        const unit = costs[letter];
        const tiles = Math.abs(from - i) + y + 1;

        iterate(newTop, newCols, cost + unit * tiles, endState);
      };

      if (top[from] == ".") {
        for (let i = from - 1; i >= 0; i--) {
          if (top[i] != ".") {
            break;
          }

          extractTo(i);
        }

        for (let i = from + 1; i < top.length; i++) {
          if (top[i] != ".") {
            break;
          }

          extractTo(i);
        }
      }
    };

    for (const [index, letter] of ["A", "B", "C", "D"].entries()) {
      const col = cols[index];

      for (let i = col.length - 1; i >= 0; i--) {
        if (col[i] == ".") {
          break;
        }

        if (col[i] != lower[letter]) {
          if (i == 0 || col[i - 1] == ".") {
            extract(i, index);

            break;
          }
        }
      }
    }

    const insert = (from, letter) => {
      const to = insertIndex[letter];

      const validInsert = () => {
        const x = to / 2 - 1;
        const col = cols[x];

        const insertAt = (y) => {
          const newTop = setCharAt(top, from, ".");
          const newCols = [...cols];
          newCols[x] = setCharAt(newCols[x], y, lower[letter]);
          const unit = costs[letter];
          const tiles = Math.abs(from - to) + y + 1;

          iterate(newTop, newCols, cost + unit * tiles, endState);
        };

        for (let i = col.length - 1; i >= 0; i--) {
          if (col[i] == lower[letter]) {
            continue;
          }

          if (col[i] == ".") {
            insertAt(i);
          }

          break;
        }
      };

      out: if (to < from) {
        for (let i = from - 1; i > to; i--) {
          if (top[i] != ".") {
            break out;
          }
        }

        validInsert();
      }

      out: if (to > from) {
        for (let i = from + 1; i < to; i++) {
          if (top[i] != ".") {
            break out;
          }
        }

        validInsert();
      }
    };

    for (const [index, letter] of top.split("").entries()) {
      if (letter != ".") {
        insert(index, letter);
      }
    }
  }

  return;
};

const myFunction = (array) => {
  const [a1, b1, c1, d1, a2, b2, c2, d2] = array;

  const a = a1 + (a2 === "A" ? "a" : a2);
  const b = b1 + (b2 === "B" ? "b" : b2);
  const c = c1 + (c2 === "C" ? "c" : c2);
  const d = d1 + (d2 === "D" ? "d" : d2);

  const endState = "...........aabbccdd";

  const cols = [a, b, c, d];

  iterate(top, cols, 0, endState);

  return hashes[endState];
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

record = Infinity;

// Problem 2
const myFunction2 = (array) => {
  const [a1, b1, c1, d1, a2, b2, c2, d2] = array;

  const a = a1 + "DD" + (a2 == "A" ? "a" : a2);
  const b = b1 + "CB" + (b2 == "B" ? "b" : b2);
  const c = c1 + "BA" + (c2 == "C" ? "c" : c2);
  const d = d1 + "AC" + (d2 == "D" ? "d" : d2);

  const endState = "...........aaaabbbbccccdddd";

  const cols = [a, b, c, d];

  iterate(top, cols, 0, endState);

  return hashes[endState];
};

const value2 = myFunction2(array);

console.log(value2);

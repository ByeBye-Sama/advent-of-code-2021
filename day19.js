const fs = require("fs");

const getScannerInfo = (lines) => {
  lines.shift();

  return lines
    .map((x) => x.split(",").map((y) => Number(y)))
    .sort(([a, b, c], [x, y, z]) => {
      if (a !== x) {
        return a - x;
      }

      if (b !== y) {
        return b - y;
      }
      return c - z;
    });
};

const array = fs
  .readFileSync("day19.txt", { encoding: "utf-8" })
  .split("\n\n")
  .map((x) => getScannerInfo(x.split("\n")));

const orientations = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, -1],
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [0, -1, 0],
  ],
  [
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0],
  ],

  [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, -1],
  ],
  [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, 1],
  ],
  [
    [-1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
  ],
  [
    [-1, 0, 0],
    [0, 0, -1],
    [0, -1, 0],
  ],

  [
    [0, 1, 0],
    [-1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, 1, 0],
    [0, 0, 1],
    [1, 0, 0],
  ],
  [
    [0, 1, 0],
    [0, 0, -1],
    [-1, 0, 0],
  ],

  [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, -1, 0],
    [-1, 0, 0],
    [0, 0, -1],
  ],
  [
    [0, -1, 0],
    [0, 0, -1],
    [1, 0, 0],
  ],
  [
    [0, -1, 0],
    [0, 0, 1],
    [-1, 0, 0],
  ],

  [
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0],
  ],
  [
    [0, 0, 1],
    [0, -1, 0],
    [1, 0, 0],
  ],
  [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [-1, 0, 0],
    [0, -1, 0],
  ],

  [
    [0, 0, -1],
    [0, 1, 0],
    [1, 0, 0],
  ],
  [
    [0, 0, -1],
    [0, -1, 0],
    [-1, 0, 0],
  ],
  [
    [0, 0, -1],
    [1, 0, 0],
    [0, -1, 0],
  ],
  [
    [0, 0, -1],
    [-1, 0, 0],
    [0, 1, 0],
  ],
];

const reorient = (s, o) => {
  return s
    .map(([a, b, c]) => [
      a * o[0][0] + b * o[0][1] + c * o[0][2],
      a * o[1][0] + b * o[1][1] + c * o[1][2],
      a * o[2][0] + b * o[2][1] + c * o[2][2],
    ])
    .sort(([a, b, c], [x, y, z]) => {
      if (a !== x) {
        return a - x;
      }

      if (b !== y) {
        return b - y;
      }

      return c - z;
    });
};

const locateAndReorient = (s0, s1) => {
  for (let i = 0; i < orientations.length; i++) {
    const s2 = reorient(s1, orientations[i]);

    for (let j = 0; j < s0.length - 11; j++) {
      const p0 = s0[j];

      for (let k = 0; k < s2.length; k++) {
        const p2 = s2[k];

        const dx = p0[0] - p2[0];

        const xMatches = s2.filter((pb) => {
          return s0.some((pa) => pa[0] - pb[0] === dx);
        });

        if (xMatches.length >= 12) {
          const dy = p0[1] - p2[1];

          const yMatches = s2.filter((pb) => {
            return s0.some(
              (pa) => pa[0] - pb[0] === dx && pa[1] - pb[1] === dy
            );
          });

          if (yMatches.length >= 12) {
            const dz = p0[2] - p2[2];

            const zMatches = s2.filter((pb) => {
              return s0.some(
                (pa) =>
                  pa[0] - pb[0] === dx &&
                  pa[1] - pb[1] === dy &&
                  pa[2] - pb[2] === dz
              );
            });

            if (zMatches.length >= 12) {
              return [[dx, dy, dz], s2];
            }
          }
        }
      }
    }
  }
  return [];
};

const setRounds = (array, offsets) => {
  let rounds = 10;

  while (rounds) {
    for (let i = 0; i < array.length; i++) {
      const scannerA = array[i];
      const offsetA = offsets[i];

      if (offsetA) {
        for (let j = 0; j < array.length; j++) {
          const offsetB = offsets[j];

          if (offsetB) {
            continue;
          }
          const scannerB = array[j];
          const [offset, reoriented] = locateAndReorient(scannerA, scannerB);

          if (offset) {
            offsets[j] = offset;
            array[j] = reoriented.map((p) => [
              p[0] + offset[0],
              p[1] + offset[1],
              p[2] + offset[2],
            ]);
          }
        }
      }
    }
    let allDone = true;

    for (let i = 0; i < array.length; i++) {
      if (!offsets[i]) allDone = false;
    }
    rounds--;

    if (allDone) {
      rounds = 0;
    }
  }
};

const myFunction = (array) => {
  let offsets = [[0, 0, 0]];

  setRounds(array, offsets);

  const points = array.reduce((a, s) => {
    return s.reduce((b, [p, q, r]) => {
      const filter = !b.some(([x, y, z]) => x === p && y === q && z === r);

      if (filter) {
        b.push([p, q, r]);
      }

      return b;
    }, a);
  }, []);

  return points.length;
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const array2 = fs
  .readFileSync("day19.txt", { encoding: "utf-8" })
  .split("\n\n")
  .map((x) => getScannerInfo(x.trim().split("\n")));

const getManhattanDistance = ([a, b, c], [x, y, z]) => {
  return Math.abs(a - x) + Math.abs(b - y) + Math.abs(c - z);
};

const myFunction2 = (array) => {
  let offsets = [[0, 0, 0]];

  setRounds(array, offsets);

  let manhattanDistance = 0;

  for (let i = 0; i < offsets.length; i++) {
    for (let j = i + 1; j < offsets.length; j++) {
      const dist = getManhattanDistance(offsets[i], offsets[j]);

      manhattanDistance = manhattanDistance > dist ? manhattanDistance : dist;
    }
  }

  return manhattanDistance;
};

const value2 = myFunction2(array2);

console.log(value2);

const fs = require("fs");

const array = fs
  .readFileSync("day22.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split(" "));

const formatArray = array.map((l) => [
  l[0] === "on",
  l[1].split(",").map((a) => {
    return a.split("..").map((b) => {
      const i = b.indexOf("=");

      if (i > -1) {
        b = b.slice(i + 1);
      }

      return Number(b);
    });
  }),
]);

const setBlocks = (cubes, lines) => {
  const [turnOn, [[xMin, xMax], [yMin, yMax], [zMin, zMax]]] = lines;

  for (let i = Math.max(-50, xMin); i <= Math.min(50, xMax); i++) {
    for (let j = Math.max(-50, yMin); j <= Math.min(50, yMax); j++) {
      for (let k = Math.max(-50, zMin); k <= Math.min(50, zMax); k++) {
        const key = `${i}|${j}|${k}`;

        if (turnOn) {
          cubes[key] = 1;
        } else {
          if (cubes[key]) {
            delete cubes[key];
          }
        }
      }
    }
  }
  return cubes;
};

const myFunction = (formatArray) => {
  const cubes = formatArray.reduce(setBlocks, {});

  return Object.keys(cubes).length;
};

const value = myFunction(formatArray);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const setBlocksAll = (cubes, lines) => {
  const [turnOn, cube] = lines;
  let slave;
  let master;

  if (turnOn) {
    master = cubes;
    slave = [cube];
  } else {
    master = [cube];
    slave = cubes;
  }

  master.forEach((masterData) => {
    const [[aMin, aMax], [bMin, bMax], [cMin, cMax]] = masterData;
    const addCubes = [];
    const removeCubes = [];

    slave.forEach((slaveData) => {
      const [[xMin, xMax], [yMin, yMax], [zMin, zMax]] = slaveData;

      if (
        xMin <= aMax &&
        xMax >= aMin &&
        yMin <= bMax &&
        yMax >= bMin &&
        zMin <= cMax &&
        zMax >= cMin
      ) {
        removeCubes.push([
          [xMin, xMax],
          [yMin, yMax],
          [zMin, zMax],
        ]);
        if (xMin < aMin) {
          addCubes.push([
            [xMin, aMin - 1],
            [yMin, yMax],
            [zMin, zMax],
          ]);
        }

        if (xMax > aMax) {
          addCubes.push([
            [aMax + 1, xMax],
            [yMin, yMax],
            [zMin, zMax],
          ]);
        }

        if (yMin < bMin) {
          addCubes.push([
            [Math.max(xMin, aMin), Math.min(xMax, aMax)],
            [yMin, bMin - 1],
            [zMin, zMax],
          ]);
        }

        if (yMax > bMax) {
          addCubes.push([
            [Math.max(xMin, aMin), Math.min(xMax, aMax)],
            [bMax + 1, yMax],
            [zMin, zMax],
          ]);
        }

        if (zMin < cMin) {
          addCubes.push([
            [Math.max(xMin, aMin), Math.min(xMax, aMax)],
            [Math.max(yMin, bMin), Math.min(yMax, bMax)],
            [zMin, cMin - 1],
          ]);
        }

        if (zMax > cMax) {
          addCubes.push([
            [Math.max(xMin, aMin), Math.min(xMax, aMax)],
            [Math.max(yMin, bMin), Math.min(yMax, bMax)],
            [cMax + 1, zMax],
          ]);
        }
      }
    });

    if (removeCubes.length > 0) {
      const filtered = ([[x0, x1], [y0, y1], [z0, z1]]) => {
        return !removeCubes.some(([[a0, a1], [b0, b1], [c0, c1]]) => {
          return (
            (a0 === x0) &
            (a1 === x1) &
            (b0 === y0) &
            (b1 === y1) &
            (c0 === z0) &
            (c1 === z1)
          );
        });
      };

      slave = slave.filter(filtered).concat(addCubes);
    }
  });
  if (turnOn) {
    return master.concat(slave);
  }

  return slave;
};

const myFunction2 = (formatArray) => {
  const cubes = formatArray.reduce(setBlocksAll, []);

  const reducer = (a, [[a0, a1], [b0, b1], [c0, c1]]) => {
    return a + (1 + a1 - a0) * (1 + b1 - b0) * (1 + c1 - c0);
  };

  return cubes.reduce(reducer, 0);
};

const value2 = myFunction2(formatArray);

console.log(value2);

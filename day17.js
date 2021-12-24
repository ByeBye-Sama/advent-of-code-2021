const fs = require("fs");

const array = fs.readFileSync("day17.txt", { encoding: "utf-8" }).trim();

const target = array.match(
  /target area: x=(?<xMin>-?\d+)..(?<xMax>-?\d+), y=(?<yMin>-?\d+)..(?<yMax>-?\d+)/
).groups;

const simulate = (obj) => {
  let { vx, vy, target } = obj;

  const steps = [];

  let x = 0;
  let y = 0;

  while (x < target.xMax && y > target.yMin) {
    steps.push({ x, y });
    x += vx;
    y += vy;

    if (vx > 0) {
      vx--;
    }

    if (vx < 0) {
      vx++;
    }

    vy--;

    if (
      x >= target.xMin &&
      x <= target.xMax &&
      y >= target.yMin &&
      y <= target.yMax
    ) {
      steps.push({ x, y });

      return steps;
    }
  }
};

const myFunction = (target) => {
  let maxY = 0;

  for (let vx = 0; vx < target.xMax; vx++) {
    for (let vy = 1000; vy >= 0; vy--) {
      const obj = { vx, vy, target };

      const steps = simulate(obj);

      if (steps) {
        let max = Math.max(...steps.map((p) => p.y));

        if (max > maxY) {
          maxY = max;
        }
      }
    }
  }
  return maxY;
};

const value = myFunction(target);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const myFunction2 = (target) => {
  let total = 0;

  for (let vx = 1; vx <= target.xMax; vx++) {
    for (let vy = 1000; vy >= target.yMin; vy--) {
      const obj = { vx, vy, target };

      const steps = simulate(obj);

      if (steps) {
        total++;
      }
    }
  }
  return total;
};

const value2 = myFunction2(target);

console.log(value2);

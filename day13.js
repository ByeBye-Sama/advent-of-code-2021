const fs = require("fs");

const [part1, part2] = fs
  .readFileSync("day13.txt", { encoding: "utf-8" })
  .trim()
  .replace(/\r/g, "")
  .split("\n\n");

const array1 = part1
  .trim()
  .split("\n")
  .map((x) => {
    const p = x.split(",").map(Number);
    return { x: p[0], y: p[1] };
  });

const array2 = part2
  .trim()
  .split("\n")
  .map((x) => x.match(/fold along (?<axis>[xy])=(?<position>\d+)/).groups)
  .map((x) => ({ axis: x.axis, position: Number(x.position) }));

const myFunction = (coordinates, foldInstructions) => {
  let points = [...coordinates.map((x) => ({ ...x }))];

  let nextPoints = [];

  for (const fold of foldInstructions) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (point[fold.axis] > fold.position) {
        point[fold.axis] =
          (point[fold.axis] - fold.position) * -1 + fold.position;
      }

      nextPoints.push(point);
    }
    break;
  }
  const set = new Set(points.map((p) => `${p.x},${p.y}`));

  return set.size;
};

const value = myFunction(array1, array2);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const myFunction2 = (coordinates, foldInstructions) => {
  let points = [...coordinates.map((x) => ({ ...x }))];

  let nextPoints = [];

  for (const fold of foldInstructions) {
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      if (point[fold.axis] > fold.position) {
        point[fold.axis] =
          (point[fold.axis] - fold.position) * -1 + fold.position;
      }

      nextPoints.push(point);
    }
  }

  const set = new Set(points.map((p) => `${p.x},${p.y}`));
  const array = [...set].map((x) => x.split(","));
  const maxX = Math.max(...array.map((x) => x[0]));
  const maxY = Math.max(...array.map((x) => x[1]));

  let string = [];

  for (let j = 0; j <= maxY; j++) {
    let line = "";

    for (let i = 0; i <= maxX; i++) {
      const key = `${i},${j}`;

      if (set.has(key)) {
        line += "█";
      } else {
        line += "·";
      }
    }
    string.push(line);
  }
  return string;
};

const value2 = myFunction2(array1, array2);

console.log(value2);

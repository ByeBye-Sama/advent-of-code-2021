const fs = require("fs");

const array = fs
  .readFileSync("day05.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((a) => Boolean(a))
  .map((a) => {
    const [from, to] = a.split(" -> ").map((b) => {
      const [x, y] = b.split(",").map(Number);

      return { x, y };
    });

    return { from, to };
  });

const myFunction = (array) => {
  const filtered = array.filter((coordinate) => {
    const sameCooordinateX = coordinate.from.x === coordinate.to.x;

    const sameCooordinateY = coordinate.from.y === coordinate.to.y;

    return sameCooordinateX || sameCooordinateY;
  });

  let count = 0;

  const memory = new Map();

  const addPoint = (key) => {
    let content = memory.get(key);

    if (!content) {
      content = 0;
    }

    content++;

    if (content === 2) {
      count++;
    }

    memory.set(key, content);
  };

  for (let i = 0; i < filtered.length; i++) {
    const coordinate = filtered[i];

    const isHorizontal = coordinate.from.y === coordinate.to.y;

    const isVertical = coordinate.from.x === coordinate.to.x;

    let start = { x: coordinate.from.x, y: coordinate.from.y };

    while (start.x !== coordinate.to.x || start.y !== coordinate.to.y) {
      addPoint([start.x, start.y].join(`,`));

      if (isHorizontal) {
        start.x += start.x < coordinate.to.x ? 1 : -1;
      }

      if (isVertical) {
        start.y += start.y < coordinate.to.y ? 1 : -1;
      }
    }
    addPoint([start.x, start.y].join(`,`));
  }

  return count;
};

const value = myFunction(array);

console.log(value);

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

const myFunction2 = (array) => {
  let count = 0;

  const memory = new Map();

  const addPoint = (key) => {
    let content = memory.get(key);

    if (!content) {
      content = 0;
    }

    content++;

    if (content === 2) {
      count++;
    }

    memory.set(key, content);
  };

  for (let i = 0; i < array.length; i++) {
    const coordinate = array[i];

    const isHorizontal = coordinate.from.y === coordinate.to.y;

    const isVertical = coordinate.from.x === coordinate.to.x;

    const isDiagonal = !isHorizontal && !isVertical;

    let start = { x: coordinate.from.x, y: coordinate.from.y };

    while (start.x !== coordinate.to.x || start.y !== coordinate.to.y) {
      addPoint([start.x, start.y].join(`,`));

      if (isHorizontal) {
        start.x += start.x < coordinate.to.x ? 1 : -1;
      }

      if (isVertical) {
        start.y += start.y < coordinate.to.y ? 1 : -1;
      }

      if (isDiagonal) {
        start.x += start.x < coordinate.to.x ? 1 : -1;
        start.y += start.y < coordinate.to.y ? 1 : -1;
      }
    }
    addPoint([start.x, start.y].join(`,`));
  }

  return count;
};

const value2 = myFunction2(array);

console.log(value2);

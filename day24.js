const fs = require("fs");

const array = fs.readFileSync("day24.txt", { encoding: "utf-8" });

const reg = new RegExp(
  `inp w
mul x 0
add x z
mod x 26
div z (-?\\d+)
add x (-?\\d+)
eql x w
eql x 0
mul y 0
add y 25
mul y x
add y 1
mul z y
mul y 0
add y w
add y (-?\\d+)
mul y x
add z y`,
  "g"
);

const formatArray = [...array.matchAll(reg)].map((x) =>
  x.slice(1, 11).map((y) => Number(y))
);

const solve = (array) => {
  const line = array.shift();

  if (line[0] === 26) {
    return line[1];
  }

  const obj = { x: line[2], y: 0, children: [] };

  while (array.length) {
    const y = solve(array);

    if (typeof y == "number") {
      obj.y = y;

      break;
    }

    obj.children.push(y);
  }

  return obj;
};

const resolve = (resolver, value) => {
  const { x, y, children } = resolver;

  const [xVal, yVal] = value(x, y);

  let modelNumber = xVal.toString();

  for (child of children) {
    modelNumber += resolve(child, value);
  }

  modelNumber += yVal;

  return modelNumber;
};

const myFunction = (array) => {
  const resolver = solve([...array]);

  const value = (x, y) => {
    const diff = x + y;
    const xVal = diff > 0 ? 9 - diff : 9;
    const yVal = diff < 0 ? 9 + diff : 9;

    return [xVal, yVal];
  };

  const modelNumber = resolve(resolver, value);

  return modelNumber;
};

const value = myFunction(formatArray);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const myFunction2 = (array) => {
  const resolver = solve([...array]);

  const value = (x, y) => {
    const diff = x + y;
    const xVal = diff < 0 ? 1 - diff : 1;
    const yVal = diff > 0 ? 1 + diff : 1;

    return [xVal, yVal];
  };

  const modelNumber = resolve(resolver, value);

  return modelNumber;
};

const value2 = myFunction2(formatArray);

console.log(value2);

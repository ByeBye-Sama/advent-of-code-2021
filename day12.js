const fs = require("fs");

const obj = {};

fs.readFileSync("day12.txt", { encoding: "utf-8" })
  .split("\n")
  .filter((x) => Boolean(x))
  .map((x) => {
    const [from, to] = x.split("-");

    if (!obj[from]) {
      obj[from] = [];
    }

    if (!obj[to]) {
      obj[to] = [];
    }

    obj[from].push(to);
    obj[to].push(from);

    return;
  });

const isSmallCave = (string) => {
  return /[a-z]/.test(string);
};

const caveSearch = (node, visited, paths) => {
  visited.push(node);

  if (node === "end") {
    paths.push(visited.join`,`);
    return;
  }

  for (const i of obj[node]) {
    if (isSmallCave(i) && visited.includes(i)) {
      continue;
    }

    caveSearch(i, [...visited], paths);
  }
};

const myFunction = () => {
  const paths = [];

  caveSearch("start", [], paths);

  return paths.length;
};

const value = myFunction();

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const caveSearch2 = (node, visited, visitedTwice, paths) => {
  visited.push(node);

  if (node === "end") {
    paths.push(visited.join(","));

    return;
  }

  for (const i of obj[node]) {
    if (i === "start") {
      continue;
    }

    if (isSmallCave(i) && visited.includes(i)) {
      if (visitedTwice) {
        continue;
      }

      if (visited.filter((x) => x === i).length >= 2) {
        continue;
      }

      caveSearch2(i, [...visited], true, paths);
    } else {
      caveSearch2(i, [...visited], visitedTwice, paths);
    }
  }
};

function myFunction2() {
  const paths = [];

  caveSearch2("start", [], false, paths);

  return paths.length;
}

const value2 = myFunction2();

console.log(value2);

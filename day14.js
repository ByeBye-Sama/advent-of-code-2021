const fs = require("fs");

const [template, data] = fs
  .readFileSync("day14.txt", { encoding: "utf-8" })
  .replace(/\r/g, "")
  .trim()
  .split("\n\n");

const pairRules = data
  .trim()
  .split("\n")
  .map((x) => x.split(" -> "));

const addToMap = (map, key, val = 1) => {
  if (!map.has(key)) {
    map.set(key, 0);
  }
  map.set(key, map.get(key) + val);
};

const arrayMap = () => {
  const pairRulesMap = new Map();

  for (const rule of pairRules) {
    pairRulesMap.set(rule[0], [rule[0][0] + rule[1], rule[1] + rule[0][1]]);
  }

  return pairRulesMap;
};

const myFunction = (array) => {
  let map = new Map();

  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    addToMap(map, pair);
  }
  const lastChar = template[template.length - 1];

  for (let i = 0; i < 10; i++) {
    let current = new Map();

    const keys = map.keys();

    for (const key of keys) {
      const next = array.get(key);

      addToMap(current, next[0], map.get(key));
      addToMap(current, next[1], map.get(key));
    }
    map = current;
  }

  const elementCount = new Map();

  addToMap(elementCount, lastChar);

  const keys = map.keys();

  for (const key of keys) {
    addToMap(elementCount, key[0], map.get(key));
  }

  const values = [...elementCount.values()];

  const min = Math.min(...values);
  const max = Math.max(...values);

  return max - min;
};

const array = arrayMap();

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const myFunction2 = (array) => {
  let map = new Map();

  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];

    addToMap(map, pair);
  }
  const lastChar = template[template.length - 1];

  for (let i = 0; i < 40; i++) {
    let current = new Map();

    const keys = map.keys();

    for (const key of keys) {
      const next = array.get(key);

      addToMap(current, next[0], map.get(key));
      addToMap(current, next[1], map.get(key));
    }
    map = current;
  }

  const elementCount = new Map();

  addToMap(elementCount, lastChar);

  const keys = map.keys();

  for (const key of keys) {
    addToMap(elementCount, key[0], map.get(key));
  }

  const values = [...elementCount.values()];

  const min = Math.min(...values);
  const max = Math.max(...values);

  return max - min;
};

const array2 = arrayMap();

const value2 = myFunction2(array2);

console.log(value2);

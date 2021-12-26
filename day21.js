const fs = require("fs");

const [player1, player2] = fs
  .readFileSync("day21.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => Number(x.charAt(x.length - 1)));

const myFunction = (player1, player2) => {
  let [p1Pos, p2Pos] = [player1, player2];
  let rolls = 0;
  let p1Score = 0;
  let p2Score = 0;
  let next = "a";

  while (p1Score < 1000 && p2Score < 1000) {
    let move = 1 + (rolls++ % 100);

    move += 1 + (rolls++ % 100);
    move += 1 + (rolls++ % 100);

    if (next === "a") {
      p1Pos = ((p1Pos - 1 + move) % 10) + 1;
      p1Score += p1Pos;
      next = "b";
    } else {
      p2Pos = ((p2Pos - 1 + move) % 10) + 1;
      p2Score += p2Pos;
      next = "a";
    }
  }
  return rolls * (p1Score < p2Score ? p1Score : p2Score);
};

const value = myFunction(player1, player2);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const toKey = (p1Position, p2Position, p1Value, p2Value) => {
  return ((p1Position * 10 + p2Position) * 100 + p1Value) * 100 + p2Value;
};

const fromKey = (key) => {
  const p2Value = key % 100;
  key = (key - p2Value) / 100;

  const p1Value = key % 100;
  key = (key - p1Value) / 100;

  const p2Position = key % 10;
  const p1Position = (key - p2Position) / 10;

  return [p1Position, p2Position, p1Value, p2Value];
};

const myFunction2 = (player1, player2) => {
  let data = {};
  data[toKey(player1 - 1, player2 - 1, 0, 0)] = 1;

  let p1Wins = 0;
  let p2Wins = 0;
  let nextPlayer = "player1";

  const hits = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1];

  while (Object.keys(data).length > 0) {
    data = Object.entries(data).reduce((player1, [k, count]) => {
      const [p1Position, p2Position, p1Value, p2Value] = fromKey(k);

      for (let i = 3; i < 10; i++) {
        const newCount = count * hits[i];

        if (nextPlayer === "player1") {
          const position = (p1Position + i) % 10;
          const value = p1Value + position + 1;

          if (value > 20) {
            p1Wins += newCount;
          } else {
            const key = toKey(position, p2Position, value, p2Value);

            player1[key] = player1[key] ? player1[key] + newCount : newCount;
          }
        } else {
          const position = (p2Position + i) % 10;
          const value = p2Value + position + 1;

          if (value > 20) {
            p2Wins += newCount;
          } else {
            const key = toKey(p1Position, position, p1Value, value);

            player1[key] = player1[key] ? player1[key] + newCount : newCount;
          }
        }
      }
      return player1;
    }, {});
    nextPlayer = nextPlayer === "player1" ? "player2" : "player1";
  }
  return p1Wins > p2Wins ? p1Wins : p2Wins;
};

const value2 = myFunction2(player1, player2);

console.log(value2);

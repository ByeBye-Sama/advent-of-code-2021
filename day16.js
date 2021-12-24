const fs = require("fs");

const parseHex = (d) => {
  switch (d) {
    case "0":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "A":
      return 10;
    case "B":
      return 11;
    case "C":
      return 12;
    case "D":
      return 13;
    case "E":
      return 14;
    case "F":
      return 15;
    default:
      break;
  }
};

const array = fs
  .readFileSync("day16.txt", { encoding: "utf-8" })
  .split("\n")
  .map((x) => x.split("").map((y) => parseHex(y)));

const getValue = (code, index, offset, n) => {
  const digits = Math.floor((offset + n + 3) / 4);
  let number = code[index] % 2 ** (4 - offset);

  for (let j = 1; j < digits; j++) {
    number = number * 16 + code[index + j];
  }

  index += digits;
  offset += n - digits * 4;

  if (offset < 0) {
    index--;
    offset += 4;
  }

  if (offset > 0) {
    number = Math.floor(number / 2 ** (4 - offset));
  }

  return [number, index, offset];
};

const getNumber = (code, index, offset) => {
  let number = 0;
  let v = 0;
  let r = 0;

  do {
    [v, index, offset] = getValue(code, index, offset, 5);

    r = v % 16;

    number = number * 16 + r;
  } while (v > r);

  return [number, index, offset];
};

const decode = (code, index = 0, offset = 0) => {
  let packet = {};

  [packet.version, index, offset] = getValue(code, index, offset, 3);
  [packet.type, index, offset] = getValue(code, index, offset, 3);

  if (packet.type === 4) {
    [packet.value, index, offset] = getNumber(code, index, offset);
  } else {
    packet.children = [];
    let child;
    let lType;

    [lType, index, offset] = getValue(code, index, offset, 1);

    if (lType === 0) {
      let len = 0;

      [len, index, offset] = getValue(code, index, offset, 15);

      let testOffset = (offset + len) % 4;
      let testIndex = index + (offset + len - testOffset) / 4;

      do {
        [child, index, offset] = decode(code, index, offset);
        packet.children.push(child);
      } while (index < testIndex || offset < testOffset);
    } else {
      let count = 0;

      [count, index, offset] = getValue(code, index, offset, 11);
      for (let i = 0; i < count; i++) {
        [child, index, offset] = decode(code, index, offset);

        packet.children.push(child);
      }
    }
  }
  return [packet, index, offset];
};

const versionSum = (packet) => {
  let sum = packet.version;
  if (packet.children) {
    packet.children.forEach((child) => {
      sum += versionSum(child);
    });
  }
  return sum;
};

const myFunction = (array) => {
  let sumValue;

  array.forEach((code) => {
    const [packet] = decode(code);

    sumValue = versionSum(packet);
  });

  return sumValue;
};

const value = myFunction(array);

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

const getPacketValue = (packet) => {
  switch (packet.type) {
    case 0:
      return packet.children.reduce((sum, child) => {
        return sum + getPacketValue(child);
      }, 0);
    case 1:
      return packet.children.reduce((prod, child) => {
        return prod * getPacketValue(child);
      }, 1);
    case 2:
      return packet.children.reduce((min, child) => {
        const v = getPacketValue(child);

        return min < v ? min : v;
      }, packet.value);
    case 3:
      return packet.children.reduce((max, child) => {
        const v = getPacketValue(child);

        return max > v ? max : v;
      }, packet.value);
    case 4:
      return packet.value;
    case 5:
      return getPacketValue(packet.children[0]) >
        getPacketValue(packet.children[1])
        ? 1
        : 0;
    case 6:
      return getPacketValue(packet.children[0]) <
        getPacketValue(packet.children[1])
        ? 1
        : 0;
    case 7:
      return getPacketValue(packet.children[0]) ===
        getPacketValue(packet.children[1])
        ? 1
        : 0;
    default:
      break;
  }
};

const myFunction2 = (array) => {
  let packetValue;

  array.forEach((code) => {
    const [packet] = decode(code);

    packetValue = getPacketValue(packet);
  });

  return packetValue;
};

const value2 = myFunction2(array);

console.log(value2);

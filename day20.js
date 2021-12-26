const fs = require("fs");

const [algorithm, array] = fs
  .readFileSync("day20.txt", { encoding: "utf-8" })
  .split("\n\n");

const image = array.trim().split("\n");

const getDefaultChar = (y, x, image, defaultChar) => {
  if (typeof image[y] !== "undefined" && typeof image[y][x] !== "undefined") {
    return image[y][x];
  }

  return defaultChar;
};

const convolution = ({ image, algorithm, defaultChar = "." }) => {
  const result = [];

  for (let y = -1; y < image.length + 1; y++) {
    const current = [];

    for (let x = -1; x < image[0].length + 1; x++) {
      let binary = "";

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const defaultCharResult =
            getDefaultChar(y + i, x + j, image, defaultChar) === "#"
              ? "1"
              : "0";

          binary += defaultCharResult;
        }
      }
      const index = parseInt(binary, 2);

      current.push(algorithm[index]);
    }
    result.push(current.join(""));
  }
  return result;
};

function doubleConvolution(data) {
  let { image, algorithm } = data;
  let defaultChar = ".";
  const img = convolution({ image, algorithm, defaultChar });

  if (algorithm[0] === "#") {
    defaultChar = "#";
  }

  return convolution({ image: img, algorithm, defaultChar });
}

function myFunction(data) {
  const result = doubleConvolution(data);

  countLight = result.join("").replace(/\./g, "").length;

  return countLight;
}

const value = myFunction({ image, algorithm });

console.log(value);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++= //

function multipleConvolution(data) {
  let { image, algorithm, steps } = data;
  let defaultChar = ".";

  for (let i = 0; i < steps; i++) {
    image = convolution({ image, algorithm, defaultChar });

    if (defaultChar === "." && algorithm[0] === "#") {
      defaultChar = "#";
    } else if (defaultChar === "#" && algorithm[511] === ".") {
      defaultChar = ".";
    }
  }
  return image;
}

function myFunction2(data) {
  const result = multipleConvolution(data);

  countLight = result.join("").replace(/\./g, "").length;

  return countLight;
}

const value2 = myFunction2({
  image,
  algorithm,
  steps: 50,
});

console.log(value2);

var XorShift = require("xorshift").constructor;

export var rng = new XorShift([1, 2, 3, 4]);

export const randomSeed = () => {
  const d = new Date();
  const seed = [
    d.getDate() * 24 + d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  ];
  console.log("seed", seed);
  rng = new XorShift(seed);
};

let XorShift = require("xorshift").constructor;

export let rng = new XorShift([1, 2, 3, 4]);

export const resetRandomSeed = (seed?: [number, number, number, number]) => {
  const d = new Date();
  if (seed === undefined) {
    seed = [
      d.getDate() * 24 + d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds()
    ];
  }
  console.log("reset random seed", seed);
  rng = new XorShift(seed);
  for (let i = 0; i < 100; i++) {
    random();
  }
};

export const random = () => {
  return rng.random();
};
// @ts-ignore
window.random = random;

export const shuffle = (xs: any[]) => {
  const tmp = [...xs];
  const ret = [];
  while (tmp.length > 0) {
    ret.push(popRandomElement(tmp));
  }
  return ret;
};

export const popRandomElement = (xs: any[]) => {
  const N = xs.length;
  const i = Math.floor(rng.random() * N);
  const ret = xs[i];
  xs.splice(i, 1);
  return ret;
};

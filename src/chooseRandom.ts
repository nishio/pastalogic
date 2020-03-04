import { PlayerID } from "./Types";
import { Game } from "./Game";
var XorShift = require("xorshift").constructor;
var rng = new XorShift([1, 2, 3, 4]);

export const chooseRandom = (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => {
  return candidate[Math.floor(rng.random() * candidate.length)];
};

export const chooseMathRandom = (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => {
  return candidate[Math.floor(Math.random() * candidate.length)];
};

let index = 0;
let buffer = [
  1,
  2,
  3,
  4,
  5,
  6,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  51,
];
export const controledRandom = () => {
  const ret = buffer[index];
  index++;
  index %= buffer.length;
  return ret;
};
export const chooseControledRandom = (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => {
  return candidate[controledRandom() % candidate.length];
};

import { Game } from "../Types";
export const countUsedIncrementToken = (game: Game): number => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numIncrementToken;
  });
  return ret;
};

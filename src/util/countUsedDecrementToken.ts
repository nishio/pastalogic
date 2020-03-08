import { Game } from "../Types";
export const countUsedDecrementToken = (game: Game): number => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numDecrementToken;
  });
  return ret;
};

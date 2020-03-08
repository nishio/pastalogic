import { PlayerID } from "../Types";
import { Game } from "../Types";

export const countUsedFlag = (playerId: PlayerID, game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    c.flags.forEach(f => {
      if (f === playerId) {
        ret++;
      }
    });
  });
  return ret;
};

export const countUsedIncrementToken = (game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numIncrementToken;
  });
  return ret;
};

export const countUsedDecrementToken = (game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numDecrementToken;
  });
  return ret;
};

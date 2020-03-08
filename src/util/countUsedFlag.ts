import { PlayerID } from "../Types";
import { Game } from "../Types";
export const countUsedFlag = (playerId: PlayerID, game: Game): number => {
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

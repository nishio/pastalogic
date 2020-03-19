import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isGameOver } from "../isGameOver";
import { countUsedFlag } from "../util/countUsedFlag";
import { getOpponent } from "../util/getOpponent";
import { neverComeHere } from "../util/assertion";
import { controledRandom } from "./chooseRandom";

export const gameToScore = (game: Game, playerId: PlayerID) => {
  const g = isGameOver(game);
  if (g) {
    if (g.type === "win") {
      if (g.winner === playerId) {
        return 100 + controledRandom() / 1000;
      } else if (g.winner === getOpponent(playerId)) {
        return -100 + controledRandom() / 1000;
      } else {
        neverComeHere("win/lose");
      }
    } else {
      return controledRandom() / 1000;
    }
  }
  let ret = 0;
  ret += numToScore(game.players[playerId].life);
  ret += numToScore(countUsedFlag(playerId, game));
  ret -= numToScore(game.players[getOpponent(playerId)].life);
  ret -= numToScore(countUsedFlag(getOpponent(playerId), game));
  ret += controledRandom() / 1000;
  return ret;
};
const numToScore = (n: number) => {
  if (n > 6) return 32;
  return 32 - 2 ** (6 - n);
};

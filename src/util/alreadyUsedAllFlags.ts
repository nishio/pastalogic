import { PlayerID } from "../Types";
import { Game } from "../Types";
import { countUsedFlag } from "./countUsedFlag";

export const alreadyUsedAllFlags = (
  playerId: PlayerID,
  game: Game
): boolean => {
  return countUsedFlag(playerId, game) === game.maxFlag;
};

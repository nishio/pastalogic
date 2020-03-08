import { PlayerID } from "../Types";
import { Game } from "../Game";

export const chooseFirst = (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => candidate[0];

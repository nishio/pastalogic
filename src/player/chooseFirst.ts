import { PlayerID } from "../Types";
import { Game } from "../Types";

export const chooseFirst = (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => candidate[0];

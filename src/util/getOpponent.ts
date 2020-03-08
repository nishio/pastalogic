import { PlayerID } from "../Types";
export const getOpponent = (p: PlayerID): PlayerID => {
  return (1 - p) as PlayerID;
};

import { PlayerID } from "../Types";
import { Game } from "../Types";
import { updateCard } from "./updateCard";
export const appendOneFlag = (
  game: Game,
  cardIndex: number,
  flag: PlayerID
): Game => {
  return updateCard(game, cardIndex, card => ({
    ...card,
    flags: [...card.flags, flag]
  }));
};

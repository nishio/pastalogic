import { PlayerID } from "../Types";
import { Game } from "../Types";
import { updateCard } from "./updateCard";
export const updateFlag = (
  game: Game,
  cardIndex: number,
  newFlag: PlayerID[]
): Game => {
  return updateCard(game, cardIndex, card => ({
    ...card,
    flags: newFlag
  }));
};

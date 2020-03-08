import { PlayerID } from "./Types";
import { Game } from "./Game";
import { updateCard } from "./updateCard";
export const updateFlag = (
  game: Game,
  cardIndex: number,
  newFlag: PlayerID[]
) => {
  return updateCard(game, cardIndex, card => ({
    ...card,
    flags: newFlag
  }));
};

import { PlayerID } from "./Types";
import { Game } from "./Game";
import { updateCard } from "./updateCard";
export const appendOneFlag = (
  game: Game,
  cardIndex: number,
  playerId: PlayerID
) => {
  return updateCard(game, cardIndex, card => ({
    ...card,
    flags: [...card.flags, playerId]
  }));
};

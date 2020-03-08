import { Game } from "./Game";
import { updateFlag } from "./updateFlag";
import { getCurrentCard } from "./getCurrentCard";

export const removeFlagAsCost = (game: Game) => {
  const newFlag = getCurrentCard(game).flags;
  newFlag.splice(game.cursor.flagIndex, 1);
  return {
    ...updateFlag(game, game.cursor.cardIndex, newFlag),
    cursor: { ...game.cursor, flagIndex: game.cursor.flagIndex - 1 }
  };
};

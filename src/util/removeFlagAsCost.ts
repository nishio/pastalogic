import { Game } from "../Types";
import { updateFlag } from "./updateFlag";
import { getCurrentCard } from "./getCurrentCard";
import { removeAFlagFromFlags } from "../card/removeAFlagFromFlags";

export const removeFlagAsCost = (game: Game): Game => {
  const newFlag = removeAFlagFromFlags(
    getCurrentCard(game).flags,
    game.cursor.flagIndex
  );
  return {
    ...updateFlag(game, game.cursor.cardIndex, newFlag),
    cursor: { ...game.cursor, flagIndex: game.cursor.flagIndex - 1 }
  };
};

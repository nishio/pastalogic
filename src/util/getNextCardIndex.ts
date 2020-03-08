import { Game } from "../Types";
import { getLoopedCardIndex } from "./getLoopedCardIndex";
export const getNextCardIndex = (game: Game, index: number): number => {
  if (game.cursorDirection === "forward") {
    return getLoopedCardIndex(index, 1, game);
  } else {
    return getLoopedCardIndex(index, -1, game);
  }
};

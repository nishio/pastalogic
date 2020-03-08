import { Game } from "./Game";
import { getCurrentCard } from "./getCurrentCard";

export const asParameter = (game: Game, base: number) => {
  return base + getCurrentCard(game).numIncrementToken;
};

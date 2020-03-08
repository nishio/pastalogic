import { Game } from "../Types";
import { getCurrentCard } from "./getCurrentCard";

export const asParameter = (game: Game, base: number): number => {
  return base + getCurrentCard(game).numIncrementToken;
};

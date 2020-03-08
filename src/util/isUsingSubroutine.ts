import { Game } from "../Types";
import { Card } from "../Types";
export const isSubroutineAndIsUsing = (card: Card, game: Game): boolean => {
  return card.name === "Subroutine" && game.returnAddress !== null;
};

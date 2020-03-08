import { Game } from "./Game";
import { Card } from "./card/Card";
export const isUsingSubroutine = (card: Card, game: Game) => {
  return card.name === "Subroutine" && game.returnAddress !== null;
};

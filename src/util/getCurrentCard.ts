import { Game, Card } from "../Types";
import { neverComeHere } from "./assertion";
export const getCurrentCard = (game: Game): Card => {
  if (game.cursor.cardIndex >= game.cards.length) {
    debugger;
    neverComeHere("pointing out of cards");
  }
  const result = game.cards[game.cursor.cardIndex];
  if (result === undefined) {
    debugger;
    neverComeHere("undefined current cards");
  }
  return result;
};

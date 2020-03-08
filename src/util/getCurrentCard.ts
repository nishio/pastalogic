import { Game, Card } from "../Types";
import { neverComeHere } from "./assertion";
export const getCurrentCard = (game: Game): Card => {
  if (game.cursor.cardIndex >= game.cards.length) {
    debugger;
    neverComeHere("pointing out of cards");
  }
  return game.cards[game.cursor.cardIndex];
};

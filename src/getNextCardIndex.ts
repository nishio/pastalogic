import { Game } from "./Game";
export const getNextCardIndex = (game: Game, index: number) => {
  if (game.cursorDirection === "forward") {
    return (index + 1) % game.cards.length;
  } else {
    return (index - 1 + game.cards.length) % game.cards.length;
  }
};

import { Game } from "./Game";
export const getCardIndex = (game: Game, index: number, change: number) => {
  return (index + change + game.cards.length) % game.cards.length;
};

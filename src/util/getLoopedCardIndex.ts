import { Game } from "../Types";

export const getLoopedCardIndex = (
  index: number,
  change: number,
  game: Game
) => {
  return (index + change + game.cards.length) % game.cards.length;
};

import { Game } from "./Game";
export const findCard = (name: string, game: Game) => {
  return game.cards.findIndex(card => card.name === name);
};

import { Game } from "../Types";
export const findCard = (name: string, game: Game): number => {
  return game.cards.findIndex(card => card.name === name);
};

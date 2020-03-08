import { Game } from "../Types";
export const isCurrentCard = (i: number, game: Game): boolean => {
  return i === game.cursor.cardIndex;
};

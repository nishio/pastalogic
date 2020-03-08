import { Game } from "../Game";
export const isCurrentCard = (i: number, game: Game) => {
  return i === game.cursor.cardIndex;
};

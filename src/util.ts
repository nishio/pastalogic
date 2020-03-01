import { Game, PlayerID } from "./Types";
export const moveCursorToNextCard = (game: Game) => {
  return {
    ...game,
    cursor: {
      cardIndex: getNextCardIndex(game, game.cursor.cardIndex),
      flagIndex: 0
    }
  };
};
export const moveCursorToNextFlag = (game: Game) => {
  return {
    ...game,
    cursor: {
      ...game.cursor,
      flagIndex: game.cursor.flagIndex + 1
    }
  };
};
const getNextCardIndex = (game: Game, index: number) => {
  return (index + 1) % game.cards.length;
};
export const getOpponent = (p: PlayerID) => {
  return 1 - p;
};
export const chooseFirst = (type: string, candidate: Game[]) => (candidate[0])


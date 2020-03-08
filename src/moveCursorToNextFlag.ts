import { Game } from "./Game";
import { getCurrentCard } from "./getCurrentCard";
export const moveCursorToNextFlag = (game: Game): Game => {
  if (game.cursor.repeatIndex === getCurrentCard(game).repeat(game)) {
    // go next flag
    return {
      ...game,
      cursor: {
        ...game.cursor,
        flagIndex: game.cursor.flagIndex + 1,
        repeatIndex: 1
      },
      time: game.time + 1
    };
  }
  return {
    ...game,
    cursor: {
      ...game.cursor,
      repeatIndex: game.cursor.repeatIndex + 1
    },
    time: game.time + 1
  };
};

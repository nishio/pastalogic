import { debugPrint } from "./debugPrint";
import { isGameOver } from "./isGameOver";
import { Game } from "./Game";
import {
  moveCursorToNextFlag,
  moveCursorToNextCard,
  getCurrentCard
} from "./util";
export const runProgram = async (game: Game) => {
  for (let i = 0; i < 3000; i++) {
    // avoid infinite loop in development
    if (isNoMoreFlagOnThisCard(game)) {
      game = moveCursorToNextCard(game);
      continue;
    }
    debugPrint(game);
    console.log("play");
    game = await step(game);
    debugPrint(game);
    const ret = isGameOver(game);
    if (ret) {
      console.log(i, ret);
      break;
    }
    game = moveCursorToNextFlag(game);
    console.log("vvvvvvvvvv");
  }
};

const step = async (game: Game) => {
  const currentCard = getCurrentCard(game);
  const currentPlayer = currentCard.flags[game.cursor.flagIndex];
  game = await currentCard.play(
    game,
    currentPlayer,
    game.players[currentPlayer].chooseFromCandidate
  );
  return game;
};

const isNoMoreFlagOnThisCard = (game: Game) => {
  const currentCard = getCurrentCard(game);
  const currentPlayer = currentCard.flags[game.cursor.flagIndex];
  if (currentPlayer === undefined) {
    return true;
  }
  return false;
};

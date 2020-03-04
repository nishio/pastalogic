import { debugPrint } from "./debugPrint";
import { isGameOver } from "./isGameOver";
import { Game } from "./Game";
import {
  moveCursorToNextFlag,
  moveCursorToNextCard,
  getCurrentCard,
  neverComeHere,
} from "./util";
export const runProgram = (game: Game) => {
  for (let i = 0; i < 3000; i++) {
    // avoid infinite loop in development
    if (isNoMoreFlagOnThisCard(game)) {
      game = moveCursorToNextCard(game);
      continue;
    }
    debugPrint(game);
    console.log("play");
    game = step(game);
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

const step = (game: Game) => {
  const currentCard = getCurrentCard(game);
  const currentPlayer = currentCard.flags[game.cursor.flagIndex];
  game = currentCard.play(
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

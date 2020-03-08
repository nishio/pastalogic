import { debugPrintWithUI, flagToStr } from "./debugPrint";
import { isGameOver } from "./isGameOver";
import { Game } from "./Types";
import { getCurrentCard } from "./util/getCurrentCard";
import { moveCursorToNextFlag } from "./moveCursorToNextFlag";
import { moveCursorToNextCard } from "./moveCursorToNextCard";
import { pushLog } from "./GLOBAL_STATE";
export const runProgram = async (game: Game) => {
  for (let i = 0; i < 3000; i++) {
    // avoid infinite loop in development
    if (isNoMoreFlagOnThisCard(game)) {
      game = moveCursorToNextCard(game);
      continue;
    }
    game = await step(game);
    const ret = isGameOver(game);
    if (ret) {
      console.log(ret);
      if (ret.type === "win") {
        pushLog(`player ${flagToStr(ret.winner)} win!`);
      } else {
        pushLog(`draw. (${ret.reason})`);
      }
      break;
    }
    game = moveCursorToNextFlag(game);
    pushLog("vvvvvvvvvv");
  }
};

const step = async (game: Game) => {
  const currentCard = getCurrentCard(game);
  const currentPlayer = currentCard.flags[game.cursor.flagIndex];
  debugPrintWithUI(game);
  pushLog("play by " + flagToStr(currentPlayer));
  game = await currentCard.play(
    game,
    currentPlayer,
    game.players[currentPlayer].chooseFromCandidate
  );
  debugPrintWithUI(game);
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

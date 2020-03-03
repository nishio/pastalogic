import { debugPrint } from "./debugPrint";
import { isGameOver } from "./isGameOver";
import { Game } from "./Types";
import { moveCursorToNextFlag, moveCursorToNextCard, getCurrentCard, neverComeHere } from "./util";
export const runProgram = (game: Game) => {
  for (let i = 0; i < 3000; i++) { // avoid infinite loop in development
    const currentCard = getCurrentCard(game);
    if (currentCard === undefined) {
      debugger;
    }
    const currentPlayer = currentCard.flags[game.cursor.flagIndex];
    if (currentPlayer === undefined) {
      game = moveCursorToNextCard(game);
      continue;
    }
    debugPrint(game);
    console.log("play");
    game = currentCard.play(game, currentPlayer, game.players[currentPlayer].chooseFromCandidate);
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

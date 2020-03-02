import { AddFlag, Bug, Increment, MoveFlag, Subroutine } from "./Card";
import { debugPrint } from "./debugPrint";
import { isGameOver } from "./isGameOver";
import { putOneFlag } from "./putOneFlag";
import { AlgorithToChooseCandidate, FirstPlayer, Game, SecondPlayer } from "./Types";
import { moveCursorToNextFlag, moveCursorToNextCard, getCurrentCard } from "./util";

export const createGame = (initialLife: number) => {
  let game = {} as Game;

}
export const startNoviceGame = (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  let game = {} as Game;
  // コマンド準備フェーズ
  game.players = [
    { life: 3, color: "red", chooseFromCandidate: algorithm0 },
    { life: 3, color: "blue", chooseFromCandidate: algorithm1 },
  ];
  game.cards = [
    Bug(),
    AddFlag(),
    Subroutine(),
    MoveFlag(),
    Increment(),
  ];
  game.cursor = { cardIndex: 0, flagIndex: 0 };
  game.returnAddress = null
  game.maxFlag = 10
  game.cursorDirection = "forward";

  // フラグ配置フェーズ
  for (let i = 0; i < 3; i++) {
    game = putOneFlag(game, FirstPlayer);
    game = putOneFlag(game, SecondPlayer);
  }

  // プログラム実行フェーズ
  //while (true) {
  for (let i = 0; i < 100; i++) {  // avoid infinite loop in development
    const currentCard = getCurrentCard(game);
    const currentPlayer = currentCard.flags[game.cursor.flagIndex];
    if (currentPlayer === undefined) {
      game = moveCursorToNextCard(game);
      continue
    }
    debugPrint(game)
    game = currentCard.play(game, currentPlayer);
    const ret = isGameOver(game);
    if (ret) {
      console.log(ret);
      break;
    }
    game = moveCursorToNextFlag(game);
  }
};

//@ts-ignore
window.startNoviceGame = startNoviceGame

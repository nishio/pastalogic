import { Increment } from "./card/Increment";
import { MoveFlag } from "./card/MoveFlag";
import { Subroutine } from "./card/Subroutine";
import { AddFlag } from "./card/AddFlag";
import { Bug } from "./card/Bug";
import { putOneFlag } from "./putOneFlag";
import { runProgram } from "./runProgram";
import { AlgorithToChooseCandidate, FirstPlayer, SecondPlayer } from "./Types";
import { debugPrintWithUI } from "./debugPrint";
import { appendOneFlag } from "./util/appendOneFlag";
import { createGame } from "./createGame";
import { pushLog } from "./GLOBAL_STATE";

export const startNoviceGame = async (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  let game = createGame(3, algorithm0, algorithm1, [
    Bug(),
    AddFlag(),
    Subroutine(),
    MoveFlag(),
    Increment()
  ]);
  debugPrintWithUI(game);

  // コマンド準備フェーズ
  pushLog("-----put flags-----");

  // フラグ配置フェーズ
  for (let i = 0; i < 3; i++) {
    game = await putOneFlag(game, FirstPlayer, algorithm0);
    debugPrintWithUI(game);
    game = await putOneFlag(game, SecondPlayer, algorithm1);
    debugPrintWithUI(game);
  }

  // プログラム実行フェーズ
  pushLog("-----run program-----");
  runProgram(game);
};

export const testNoviceGame = (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  // コマンド準備フェーズ
  let game = createGame(3, algorithm0, algorithm1, [
    Bug(),
    AddFlag(),
    Subroutine(),
    MoveFlag(),
    Increment()
  ]);

  game = appendOneFlag(game, 3, FirstPlayer);
  game = appendOneFlag(game, 4, SecondPlayer);

  // プログラム実行フェーズ
  runProgram(game);
};

//@ts-ignore
window.startNoviceGame = startNoviceGame;

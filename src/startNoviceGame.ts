import { Increment } from "./card/Increment";
import { MoveFlag } from "./card/MoveFlag";
import { Subroutine } from "./card/Subroutine";
import { AddFlag } from "./card/AddFlag";
import { Bug } from "./card/Bug";
import { putOneFlag } from "./putOneFlag";
import { runProgram } from "./runProgram";
import { AlgorithToChooseCandidate, FirstPlayer, SecondPlayer } from "./Types";
import { debugPrintWithUI } from "./debugPrint";
import { createGame } from "./createGame";
import { pushLog } from "./GLOBAL_STATE";
import { resetRandomSeed } from "./player/XorShift";

export const startNoviceGame = async (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  resetRandomSeed();
  let game = createGame({
    initialLife: 3,
    maxFlag: 10,
    maxLife: 6,
    numInitialFlag: 3,
    algorithmOfFirstPlayer: algorithm0,
    algorithmOfSecondPlayer: algorithm1,
    cards: [Bug(), AddFlag(), Subroutine(), MoveFlag(), Increment()]
  });

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
  game = { ...game, phase: "RunProgram" };
  runProgram(game);
};

import {
  AddFlag,
  Bug,
  Increment,
  MoveFlag,
  Subroutine,
  Reverse,
  Rotate,
  SwapCommand,
  FastPass,
  ForkBomb,
  Debug,
  TradeOff,
  Decrement,
  RemoveCommand,
  RemoveFlag
} from "./Card";
import { putOneFlag } from "./putOneFlag";
import { AlgorithToChooseCandidate, FirstPlayer, SecondPlayer } from "./Types";
import { Game } from "./Game";
import { Reorder } from "./Reorder";
import { runProgram } from "./runProgram";
import { createGame } from "./createGame";

export const startRandomGame = async (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  // コマンド準備フェーズ
  let game = createGame(100, algorithm0, algorithm1, [
    Bug(),
    AddFlag(),
    Subroutine(),
    MoveFlag(),
    Increment(),
    Reorder(),
    Reverse(),
    Rotate(),
    SwapCommand(),
    FastPass(),
    ForkBomb(),
    Debug(),
    TradeOff(),
    RemoveFlag(),
    RemoveCommand(),
    Decrement()
  ]);
  // フラグ配置フェーズ
  for (let i = 0; i < 16; i++) {
    game = await putOneFlag(game, FirstPlayer, algorithm0);
    game = await putOneFlag(game, SecondPlayer, algorithm1);
  }

  // プログラム実行フェーズ
  runProgram(game);
};

//@ts-ignore
window.startRandomGame = startRandomGame;

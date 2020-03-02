import { AddFlag, Bug, Increment, MoveFlag, Subroutine, Reverse, Rotate, SwapCommand, FastPass, ForkBomb, Debug, TradeOff, Decrement, RemoveCommand, RemoveFlag } from "./Card";
import { putOneFlag } from "./putOneFlag";
import { AlgorithToChooseCandidate, FirstPlayer, Game, SecondPlayer } from "./Types";
import { Reorder } from "./Reorder";
import { runProgram } from "./runProgram";

export const startRandomGame = (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  let game = {} as Game;
  // コマンド準備フェーズ
  game.players = [
    { life: 100, color: "red", chooseFromCandidate: algorithm0 },
    { life: 100, color: "blue", chooseFromCandidate: algorithm1 },
  ];
  game.cards = [
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
  ]

  game.cursor = { cardIndex: 0, flagIndex: 0 };
  game.returnAddress = null
  game.maxFlag = 20
  game.maxLife = 200
  game.cursorDirection = "forward";

  // フラグ配置フェーズ
  for (let i = 0; i < 16; i++) {
    game = putOneFlag(game, FirstPlayer, algorithm0);
    game = putOneFlag(game, SecondPlayer, algorithm1);
  }

  // プログラム実行フェーズ
  runProgram(game)

};

//@ts-ignore
window.startRandomGame = startRandomGame

import { AddFlag, Bug, Increment, MoveFlag, Subroutine, Card } from "./Card";
import { putOneFlag } from "./putOneFlag";
import { runProgram } from "./runProgram";
import { AlgorithToChooseCandidate, FirstPlayer, Game, SecondPlayer } from "./Types";
import { debugPrint } from "./debugPrint";
import { appendOneFlag } from "./util";

export const createGame = (
  initialLife: number,
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate,
  cards: Card[],

  maxFlag = 10,
  maxLife = 6,
): Game => {
  let game = {} as Game;
  game.cursor = { cardIndex: 0, flagIndex: 0 };
  game.returnAddress = null
  game.maxFlag = maxFlag
  game.maxLife = maxLife
  game.cursorDirection = "forward";
  game.players = [
    { life: initialLife, color: "red", chooseFromCandidate: algorithm0 },
    { life: initialLife, color: "blue", chooseFromCandidate: algorithm1 },
  ];
  game.cards = cards
  return game;
}

export const startNoviceGame = (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  let game = createGame(
    3,
    algorithm0, algorithm1,
    [
      Bug(),
      AddFlag(),
      Subroutine(),
      MoveFlag(),
      Increment(),
    ]
  )

  // コマンド準備フェーズ

  // フラグ配置フェーズ
  for (let i = 0; i < 3; i++) {
    game = putOneFlag(game, FirstPlayer, algorithm0);
    debugPrint(game)
    game = putOneFlag(game, SecondPlayer, algorithm1);
    debugPrint(game)
  }

  // プログラム実行フェーズ
  console.log("-----run program-----")
  runProgram(game)
};


export const testNoviceGame = (
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

  game = appendOneFlag(game, 3, FirstPlayer)
  game = appendOneFlag(game, 4, SecondPlayer)

  // プログラム実行フェーズ
  runProgram(game)
};

//@ts-ignore
window.startNoviceGame = startNoviceGame

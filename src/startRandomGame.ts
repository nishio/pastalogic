import { AddFlag, Bug, Increment, MoveFlag, Subroutine, Reverse, Rotate, SwapCommand, FastPass, ForkBomb, Debug, TradeOff, Decrement, RemoveCommand, RemoveFlag } from "./Card";
import { debugPrint } from "./debugPrint";
import { isGameOver } from "./isGameOver";
import { putOneFlag } from "./putOneFlag";
import { AlgorithToChooseCandidate, FirstPlayer, Game, SecondPlayer } from "./Types";
import { moveCursorToNextFlag, moveCursorToNextCard, getCurrentCard } from "./util";
import { Reorder } from "./Reorder";

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
  game.cursorDirection = "forward";



  // フラグ配置フェーズ
  for (let i = 0; i < 16; i++) {
    game = putOneFlag(game, FirstPlayer);
    game = putOneFlag(game, SecondPlayer);
  }

  // プログラム実行フェーズ
  //while (true) {
  for (let i = 0; i < 3000; i++) {  // avoid infinite loop in development
    const currentCard = getCurrentCard(game);
    if (currentCard === undefined) {
      debugger;
    }
    const currentPlayer = currentCard.flags[game.cursor.flagIndex];
    console.log("currentPlayer", currentPlayer, currentCard, game.cursor.flagIndex)
    if (currentPlayer === undefined) {
      game = moveCursorToNextCard(game);
      continue
    }
    debugPrint(game)
    console.log("play")
    game = currentCard.play(game, currentPlayer);
    debugPrint(game)
    const ret = isGameOver(game);
    if (ret) {
      console.log(i, ret);
      break;
    }
    game = moveCursorToNextFlag(game);
    console.log("moveCursorToNextFlag")
    debugPrint(game)
  }
};

//@ts-ignore
window.startRandomGame = startRandomGame

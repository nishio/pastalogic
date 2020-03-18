import { putOneFlag } from "./putOneFlag";
import { runProgram } from "./runProgram";
import { FirstPlayer, SecondPlayer } from "./Types";
import { debugPrintWithUI } from "./debugPrint";
import { createGame } from "./createGame";
import { pushLog } from "./GLOBAL_STATE";
import {
  rng,
  shuffle,
  resetRandomSeed,
  popRandomElement
} from "./player/XorShift";
import { HumanPlayer } from "./player/HumanPlayer";
import { AddFlag } from "./card/AddFlag";
import { MoveFlag } from "./card/MoveFlag";
import { Decrement } from "./card/Decrement";
import { FastPass } from "./card/FastPass";
import { ForkBomb } from "./card/ForkBomb";
import { Increment } from "./card/Increment";
import { RemoveFlag } from "./card/RemoveFlag";
import { RemoveCommand } from "./card/RemoveCommand";
import { Reorder } from "./card/Reorder";
import { Reverse } from "./card/Reverse";
import { Rotate } from "./card/Rotate";
import { Subroutine } from "./card/Subroutine";
import { SwapCommand } from "./card/SwapCommand";
import { TradeOff } from "./card/TradeOff";
import { Debug } from "./card/Debug";
import { Bug } from "./card/Bug";
import { chooseMCC } from "./player/chooseMCC";

export const startRandomGame = async () => {
  resetRandomSeed();
  let firstPlayer, secondPlayer;
  if (rng.random() < 0.5) {
    firstPlayer = HumanPlayer;
    secondPlayer = chooseMCC;
  } else {
    firstPlayer = chooseMCC;
    secondPlayer = HumanPlayer;
  }
  const cards = [AddFlag, MoveFlag, Bug];
  const otherCards = [
    Debug,
    Decrement,
    FastPass,
    ForkBomb,
    Increment,
    RemoveFlag,
    RemoveCommand,
    Reorder,
    Reverse,
    Rotate,
    Subroutine,
    SwapCommand,
    TradeOff
  ];
  for (let i = 0; i < 5; i++) {
    cards.push(popRandomElement(otherCards));
  }

  let game = createGame({
    initialLife: 5,
    maxFlag: 10,
    maxLife: 6,
    numInitialFlag: 5,
    algorithmOfFirstPlayer: firstPlayer,
    algorithmOfSecondPlayer: secondPlayer,
    cards: shuffle(cards.map(f => f()))
  });

  debugPrintWithUI(game);

  // コマンド準備フェーズ
  pushLog("-----put flags-----");

  // フラグ配置フェーズ
  for (let i = 0; i < 5; i++) {
    game = await putOneFlag(game, FirstPlayer, firstPlayer);
    debugPrintWithUI(game);
    game = await putOneFlag(game, SecondPlayer, secondPlayer);
    debugPrintWithUI(game);
  }

  // プログラム実行フェーズ
  pushLog("-----run program-----");
  game = { ...game, phase: "RunProgram" };
  runProgram(game);
};

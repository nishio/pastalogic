import { putOneFlag } from "./putOneFlag";
import { runProgram } from "./runProgram";
import { FirstPlayer, SecondPlayer, Game } from "./Types";
import { debugPrintWithUI } from "./debugPrint";
import { createGame } from "./createGame";
import { pushLog } from "./GLOBAL_STATE";
import {
  shuffle,
  resetRandomSeed,
  popRandomElement,
  random
} from "./player/XorShift";
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
import { chooseMCC, setUpMCC, MCCHumanPlayer } from "./player/chooseMCC";
import { chooseMC } from "./player/chooseMC";
import { HumanPlayer } from "./player/HumanPlayer";

export const startRandomGame = async (dev: boolean = false) => {
  resetRandomSeed();
  let firstPlayer, secondPlayer;
  if (random() < 0.5) {
    if (dev) {
      firstPlayer = MCCHumanPlayer;
      secondPlayer = chooseMCC;
      setUpMCC(SecondPlayer);
    } else {
      firstPlayer = HumanPlayer;
      secondPlayer = chooseMC;
    }
  } else {
    if (dev) {
      firstPlayer = chooseMCC;
      secondPlayer = MCCHumanPlayer;
      setUpMCC(FirstPlayer);
    } else {
      firstPlayer = chooseMC;
      secondPlayer = HumanPlayer;
    }
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

  let game: Game = createGame({
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

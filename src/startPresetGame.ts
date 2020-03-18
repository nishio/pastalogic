import { putOneFlag } from "./putOneFlag";
import { runProgram } from "./runProgram";
import { FirstPlayer, SecondPlayer, Card } from "./Types";
import { debugPrintWithUI } from "./debugPrint";
import { createGame } from "./createGame";
import { pushLog } from "./GLOBAL_STATE";
import { shuffle, resetRandomSeed, random } from "./player/XorShift";
import { HumanPlayer } from "./player/HumanPlayer";
import { chooseMC } from "./player/chooseMC";

type TypePreset = (() => Card)[];
export const startPresetGame = async (preset: TypePreset, toShuffle = true) => {
  resetRandomSeed();
  let firstPlayer, secondPlayer;
  if (random() < 0.5) {
    firstPlayer = HumanPlayer;
    secondPlayer = chooseMC;
  } else {
    firstPlayer = chooseMC;
    secondPlayer = HumanPlayer;
  }
  let cards = preset.map(f => f());
  if (toShuffle) {
    cards = shuffle(cards);
  }

  let game = createGame({
    initialLife: 5,
    maxFlag: 10,
    maxLife: 6,
    numInitialFlag: 5,
    algorithmOfFirstPlayer: firstPlayer,
    algorithmOfSecondPlayer: secondPlayer,
    cards: cards
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

import { putOneFlag } from "./putOneFlag";
import { Game, FirstPlayer, SecondPlayer, PlayerID, AlgorithToChooseCandidate } from "./Types";
import { Bug, AddFlag, Subroutine, MoveFlag, Increment } from "./Card";
import { moveCursorToNextCard, moveCursorToNextFlag } from "./util";
import { isGameOver } from "./isGameOver";
import { debugPrint } from "./debugPrint";

export const startNoviceGame = (
  algorithm0: AlgorithToChooseCandidate,
  algorithm1: AlgorithToChooseCandidate
) => {
  let game = {} as Game;
  // コマンド準備フェーズ
  game.players = [
    { life: 3, flag: 3, color: "red", chooseFromCandidate: algorithm0 },
    { life: 3, flag: 3, color: "blue", chooseFromCandidate: algorithm1 },
  ];
  game.cards = [
    Bug(),
    AddFlag(),
    Subroutine(),
    MoveFlag(),
    Increment(),
  ];
  game.cursor = { cardIndex: 0, flagIndex: 0 };

  // フラグ配置フェーズ
  game = putOneFlag(game, FirstPlayer);
  game = putOneFlag(game, SecondPlayer);
  game = putOneFlag(game, FirstPlayer);
  game = putOneFlag(game, SecondPlayer);
  game = putOneFlag(game, FirstPlayer);
  game = putOneFlag(game, SecondPlayer);

  // プログラム実行フェーズ
  while (true) {
    debugPrint(game)
    const currentCard = game.cards[game.cursor.cardIndex];
    const currentFlag = currentCard.flags[game.cursor.flagIndex];
    if (currentFlag === undefined) {
      game = moveCursorToNextCard(game);
      continue;
    }
    const currentPlayer: PlayerID = currentFlag;
    game = currentCard.play(game, currentPlayer);
    const ret = isGameOver(game);
    if (ret) {
      console.log(ret);
      break;
    }
    game = moveCursorToNextFlag(game);
  }
};


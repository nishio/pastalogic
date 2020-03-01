import { AddFlag, Bug, Increment, MoveFlag, Subroutine } from "./Card";
import { debugPrint } from "./debugPrint";
import { isGameOver } from "./isGameOver";
import { putOneFlag } from "./putOneFlag";
import { AlgorithToChooseCandidate, FirstPlayer, Game, SecondPlayer } from "./Types";
import { moveCursorToNextFlag, moveCursorToNextCard } from "./util";

export const startNoviceGame = (
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

  // フラグ配置フェーズ
  for (let i = 0; i < 3; i++) {
    game = putOneFlag(game, FirstPlayer);
    game = putOneFlag(game, SecondPlayer);
  }

  // プログラム実行フェーズ
  while (true) {
    const currentCard = game.cards[game.cursor.cardIndex];
    const currentPlayer = currentCard.flags[game.cursor.flagIndex];
    if (currentPlayer === undefined) {
      game = moveCursorToNextCard(game);
      continue
    }
    debugPrint(game)
    game = currentCard.play(game, currentPlayer);
    const ret = isGameOver(game);
    if (ret) {
      console.log(ret);
      break;
    }
    game = moveCursorToNextFlag(game);
  }
};


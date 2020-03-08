import { Increment } from "./Increment";
import { MoveFlag } from "./MoveFlag";
import { Subroutine } from "./Subroutine";
import { AddFlag } from "./AddFlag";
import { Bug } from "./Bug";
import { putOneFlag } from "./putOneFlag";
import { runProgram } from "./runProgram";
import { FirstPlayer, SecondPlayer } from "./Types";
import { Game } from "./Game";
import { debugPrint } from "./debugPrint";
import { createGame } from "./createGame";
import { chooseMC } from "./chooseMC";
import { getCurrentCard } from "./util";
import { isGameOver } from "./isGameOver";

export const wholeTest = async () => {
  let game = createGame(3, chooseMC, chooseMC, [
    Bug(),
    AddFlag(),
    Subroutine(),
    MoveFlag(),
    Increment()
  ]);
  // コマンド準備フェーズ
  // フラグ配置フェーズ
  for (let i = 0; i < 3; i++) {
    game = await putOneFlag(game, FirstPlayer, chooseMC);
    debugPrint(game);
    game = await putOneFlag(game, SecondPlayer, chooseMC);
    debugPrint(game);
  }
  // プログラム実行フェーズ
  console.log("-----run program-----");
};

// const foo = (game: Game) => {
//   const currentCard = getCurrentCard(game);
//   const currentPlayer = currentCard.flags[game.cursor.flagIndex];
//   let candidate = getCurrentCard(game).getCandidate(game, currentPlayer);
//   if (currentPlayer === FirstPlayer) {
//     candidate.some((game: Game) => {
//       if (isGameOver(game)?.winner === FirstPlayer) {
//         // win
//         return isGameOver(game);
//       }
//     });
//   }
//   if (currentPlayer === SecondPlayer) {
//     candidate.some((game: Game) => {
//       if (isGameOver(game)?.winner === SecondPlayer) {
//         // lose
//         return isGameOver(game);
//       }
//     });
//   }
// };

// @ts-ignore
window.wholeTest = wholeTest;

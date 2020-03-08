import { AddFlag } from "./card/AddFlag";
import { Bug } from "./card/Bug";
import { Increment } from "./card/Increment";
import { MoveFlag } from "./card/MoveFlag";
import { Subroutine } from "./card/Subroutine";
import { createGame } from "./createGame";
import { debugPrint } from "./debugPrint";
import { chooseMC } from "./player/chooseMC";
import { putOneFlag } from "./putOneFlag";
import { FirstPlayer, SecondPlayer } from "./Types";

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

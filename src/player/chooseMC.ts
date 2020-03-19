import { PlayerID, FirstPlayer, SecondPlayer } from "../Types";
import { Game } from "../Types";
import { isGameOver } from "../isGameOver";
import { countUsedFlag } from "../util/countUsedFlag";
import { getCurrentCard } from "../util/getCurrentCard";
import { moveCursorToNextFlag } from "../moveCursorToNextFlag";
import { moveCursorToNextCard } from "../moveCursorToNextCard";
import { chooseRandom } from "./chooseRandom";
import { debugPrint } from "../debugPrint";
import { putOneFlag } from "../putOneFlag";
import { gameToScore } from "./gameToScore";

const SHOW_PROGRESS = false;
const SHOW_CANDIDATE_SCORE = false;
const SHOW_BEST_SCORE = false;
export const chooseMC = async (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
): Promise<Game> => {
  let bestScore = -1e99;
  let bestGame = { ...candidate[0] };
  for (let game of candidate) {
    const start = { ...game };
    let s = 0;
    const NUM_TRIAL: number = 100;
    for (let trial = 0; trial < NUM_TRIAL; trial++) {
      game = { ...start };
      for (let i = 0; i < 50; i++) {
        if (game.phase === "PutFlag") {
          const n1 = countUsedFlag(FirstPlayer, game);
          const n2 = countUsedFlag(SecondPlayer, game);
          if (n1 === game.numInitialFlag && n2 === game.numInitialFlag) {
            game = { ...game, phase: "RunProgram" };
          } else if (n1 === n2) {
            // Put FirstPlayer
            game = await putOneFlag(game, FirstPlayer, chooseRandom);
          } else {
            // Put SecondPlayer
            game = await putOneFlag(game, SecondPlayer, chooseRandom);
          }
          continue;
        }
        const currentCard = getCurrentCard(game);
        const currentPlayer = currentCard.flags[game.cursor.flagIndex];
        if (currentPlayer === undefined) {
          game = moveCursorToNextCard(game);
          continue;
        }
        if (NUM_TRIAL === 1 && SHOW_PROGRESS) {
          console.log("vvv");
          debugPrint(game);
          console.log("play");
        }
        game = await currentCard.play(game, currentPlayer, chooseRandom);
        if (NUM_TRIAL === 1 && SHOW_PROGRESS) {
          debugPrint(game);
        }
        const ret = isGameOver(game);
        if (ret) {
          break;
        }
        game = moveCursorToNextFlag(game);
      }
      s += gameToScore(game, playerId);
      //console.log(s)
      //debugPrint(game)
    }
    if (SHOW_CANDIDATE_SCORE) {
      console.log("---");
      console.log("candidate");
      debugPrint(start);
      console.log("score", s);
      debugPrint(game);
      console.log("---");
    }
    if (s > bestScore) {
      bestGame = start;
      bestScore = s;
    }
  }
  if (SHOW_BEST_SCORE) {
    console.log("best score:", bestScore);
  }
  return bestGame;
};

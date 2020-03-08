import { PlayerID } from "../Types";
import { Game } from "../Game";
import { isGameOver } from "../isGameOver";
import { constUsedFlag } from "../card/Card";
import { getCurrentCard } from "../getCurrentCard";
import { getOpponent } from "../getOpponent";
import { moveCursorToNextFlag } from "../moveCursorToNextFlag";
import { moveCursorToNextCard } from "../moveCursorToNextCard";
import { neverComeHere } from "../assertion";
import { controledRandom, chooseRandom } from "./chooseRandom";
import { debugPrint } from "../debugPrint";

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
      s += score(game, playerId);
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

const score = (game: Game, playerId: PlayerID) => {
  const g = isGameOver(game);
  if (g) {
    if (g.type === "win") {
      if (g.winner === playerId) {
        return 100 + controledRandom() / 1000;
      } else if (g.winner === getOpponent(playerId)) {
        return -100 + controledRandom() / 1000;
      } else {
        neverComeHere("win/lose");
      }
    } else {
      return controledRandom() / 1000;
    }
  }

  let ret = 0;
  ret += numToScore(game.players[playerId].life);
  ret += numToScore(constUsedFlag(playerId, game));
  ret -= numToScore(game.players[getOpponent(playerId)].life);
  ret -= numToScore(constUsedFlag(getOpponent(playerId), game));
  ret += controledRandom() / 1000;
  return ret;
};

const numToScore = (n: number) => {
  if (n > 6) return 32;
  return 32 - 2 ** (6 - n);
};

// montecalro, which run concurrently on WebWorker
// it shares most of code with chooseMC
import {
  PlayerID,
  FirstPlayer,
  SecondPlayer,
  AlgorithToChooseCandidate,
  Card
} from "../Types";
import { Game } from "../Types";
import { isGameOver } from "../isGameOver";
import { countUsedFlag } from "../util/countUsedFlag";
import { getCurrentCard } from "../util/getCurrentCard";
import { getOpponent } from "../util/getOpponent";
import { moveCursorToNextFlag } from "../moveCursorToNextFlag";
import { moveCursorToNextCard } from "../moveCursorToNextCard";
import { neverComeHere } from "../util/assertion";
import { controledRandom, chooseRandom } from "./chooseRandom";
import { debugPrint, gameToStr } from "../debugPrint";
import { getGlobal } from "reactn";
import { putOneFlag } from "../putOneFlag";
import { HumanPlayer } from "./HumanPlayer";

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./webworker";

const SHOW_PROGRESS = false;
const SHOW_CANDIDATE_SCORE = false;
const SHOW_BEST_SCORE = false;
let cache: { [key: string]: { score: number; num_trial: number } } = {};

let mySide: PlayerID | null = null;
let worker: Worker | null = null;
export const setUpMCC = (me: PlayerID) => {
  mySide = me;
  worker = new Worker();
  worker.onmessage = onmessage;
};

const onmessage = (msg: any) => {
  console.log("return from worker", msg);
};

export const MCCHumanPlayer: AlgorithToChooseCandidate = async (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
) => {
  waitOpponentChoice(candidate);
  return HumanPlayer(type, playerId, candidate);
};

const makeSerializable = (games: Game[]) => {
  // functions are not serializable
  return games.map((game: Game) => {
    return {
      ...game,
      players: [
        {
          ...game.players[0],
          chooseFromCandidate: null,
          play: null
        },
        {
          ...game.players[1],
          chooseFromCandidate: null,
          play: null
        }
      ],
      cards: game.cards.map(makeCardSerializable)
    };
  });
};

const makeCardSerializable = (c: Card) => {
  return {
    name: c.name,
    flags: c.flags,
    numIncrementToken: c.numIncrementToken,
    numDecrementToken: c.numDecrementToken
  };
};

const waitOpponentChoice = (candidateOfOpponent: Game[]) => {
  worker?.postMessage({
    type: "start",
    candidateOfOpponent: makeSerializable(candidateOfOpponent),
    mySide: mySide
  });
};

const foo = () => {};

export const resetCache = () => {
  cache = {};
};

const prefetch = () => {
  const log = getGlobal().log;
  const last = log[log.length - 1];
  console.log(last);
  console.log(typeof last);
  let start = last[Math.floor(Math.random() * last.length)];
  console.log(start);
  debugPrint(start);
  // need to distinguish `place flags` phase or `run program` phasse
};
// @ts-ignore
window.prefetch = prefetch;

export const chooseMCC = async (
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
            continue;
          } else if (n1 === n2) {
            // Put FirstPlayer
            game = await putOneFlag(game, FirstPlayer, chooseRandom);
          } else {
            // Put SecondPlayer
            game = await putOneFlag(game, SecondPlayer, chooseRandom);
          }
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
    const key = gameToStr(start);
    const v = cache[key];
    if (v !== undefined) {
      s = (s + v.score) / (NUM_TRIAL + v.num_trial);
    } else {
      s = s / NUM_TRIAL;
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
  ret += numToScore(countUsedFlag(playerId, game));
  ret -= numToScore(game.players[getOpponent(playerId)].life);
  ret -= numToScore(countUsedFlag(getOpponent(playerId), game));
  ret += controledRandom() / 1000;
  return ret;
};

const numToScore = (n: number) => {
  if (n > 6) return 32;
  return 32 - 2 ** (6 - n);
};
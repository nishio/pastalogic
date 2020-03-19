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
import { moveCursorToNextFlag } from "../moveCursorToNextFlag";
import { moveCursorToNextCard } from "../moveCursorToNextCard";
import { chooseRandom } from "./chooseRandom";
import { debugPrint, gameToStr } from "../debugPrint";
import { putOneFlag } from "../putOneFlag";
import { HumanPlayer } from "./HumanPlayer";

// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!./webworker";
import { gameToScore } from "./gameToScore";

const SHOW_PROGRESS = false;
const SHOW_CANDIDATE_SCORE = false;
const SHOW_BEST_SCORE = false;
let cache: CACHE_TYPE = {};
type CACHE_TYPE = { [key: string]: { score: number; num_trial: number } };

let mySide: PlayerID | null = null;
let worker: Worker = new Worker();

export const setUpMCC = (me: PlayerID) => {
  mySide = me;
  worker = new Worker();
  worker.onmessage = onmessage;
};

const onmessage = (msg: any) => {
  console.log("return from worker", msg);
};

const getCache = () => {
  return new Promise(resolve => {
    worker.onmessage = (msg: any) => {
      resolve(msg.data);
    };
    worker.postMessage({
      type: "finish"
    });
  });
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

export const chooseMCC = async (
  type: string,
  playerId: PlayerID,
  candidate: Game[]
): Promise<Game> => {
  let bestScore = -1e99;
  let bestGame = { ...candidate[0] };
  cache = (await getCache()) as CACHE_TYPE;
  for (let game of candidate) {
    const start = { ...game };
    let s = 0;
    const NUM_TRIAL: number = 10;
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
    const key = gameToStr(start);
    const v = cache[key];
    if (v !== undefined) {
      console.log(
        "cache hit:",
        key,
        v.num_trial,
        (v.score / v.num_trial).toFixed(2)
      );
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

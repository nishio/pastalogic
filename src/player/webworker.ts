import {
  Game,
  PlayerID,
  Card,
  CardName,
  FirstPlayer,
  SecondPlayer
} from "../Types";
import { AddFlag } from "../card/AddFlag";
import { Bug } from "../card/Bug";
import { Debug } from "../card/Debug";
import { Decrement } from "../card/Decrement";
import { FastPass } from "../card/FastPass";
import { ForkBomb } from "../card/ForkBomb";
import { Increment } from "../card/Increment";
import { MoveFlag } from "../card/MoveFlag";
import { RemoveCommand } from "../card/RemoveCommand";
import { RemoveFlag } from "../card/RemoveFlag";
import { Reorder } from "../card/Reorder";
import { Rotate } from "../card/Rotate";
import { Subroutine } from "../card/Subroutine";
import { SwapCommand } from "../card/SwapCommand";
import { TradeOff } from "../card/TradeOff";
import { gameToStr } from "../debugPrint";
import { getRandomElement } from "./XorShift";
import { countUsedFlag } from "../util/countUsedFlag";
import { putOneFlag, getCandidateToPutFlag } from "../putOneFlag";
import { chooseRandom } from "./chooseRandom";
import { getCurrentCard } from "../util/getCurrentCard";
import { moveCursorToNextCard } from "../moveCursorToNextCard";
import { isGameOver } from "../isGameOver";
import { moveCursorToNextFlag } from "../moveCursorToNextFlag";
import { gameToScore } from "./gameToScore";
import { Reverse } from "../card/Reverse";

let cache: { [key: string]: { score: number; num_trial: number } } = {};

const nameToCard = {
  AddFlag: AddFlag(),
  Bug: Bug(),
  Debug: Debug(),
  Decrement: Decrement(),
  FastPass: FastPass(),
  ForkBomb: ForkBomb(),
  Increment: Increment(),
  MoveFlag: MoveFlag(),
  RemoveCommand: RemoveCommand(),
  RemoveFlag: RemoveFlag(),
  Reorder: Reorder(),
  Reverse: Reverse(),
  Rotate: Rotate(),
  Subroutine: Subroutine(),
  SwapCommand: SwapCommand(),
  TradeOff: TradeOff()
} as { [key: string]: Card };

const getCardImpl = (name: CardName): Card => {
  const key: string = name;
  const card = nameToCard[key];
  return card;
};

const start = async (candidateOfOpponent: Game[], me: PlayerID) => {
  candidateOfOpponent.forEach((game: Game) => {
    game.cards.forEach((card: Card) => {
      const c = getCardImpl(card.name);
      if (c === undefined) {
        debugger;
      }
      card.getCandidate = c.getCandidate;
      card.play = c.play;
      card.repeat = c.repeat;
    });
  });
  gCandidateOfOpponent = candidateOfOpponent;
  gMe = me;
};

let gCandidateOfOpponent: Game[] = [];
let gMe: PlayerID = FirstPlayer;
setInterval(async () => {
  if (gCandidateOfOpponent.length === 0) return;
  // play random until my turn
  let game = await playRandomUntilMyTurn(gCandidateOfOpponent, gMe);
  // calc score for each choice
  if (game !== null) {
    calcScoreForEachCandidate(game, gMe);
  }
}, 10);

const calcScoreForEachCandidate = async (candidate: Game[], me: PlayerID) => {
  for (let game of candidate) {
    const start = {
      ...game
    };
    let s = 0;
    const NUM_TRIAL: number = 10;
    for (let trial = 0; trial < NUM_TRIAL; trial++) {
      game = {
        ...start
      };
      for (let i = 0; i < 50; i++) {
        if (game.phase === "PutFlag") {
          const n1 = countUsedFlag(FirstPlayer, game);
          const n2 = countUsedFlag(SecondPlayer, game);
          if (n1 === game.numInitialFlag && n2 === game.numInitialFlag) {
            game = {
              ...game,
              phase: "RunProgram"
            };
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
        game = await currentCard.play(game, currentPlayer, chooseRandom);
        const ret = isGameOver(game);
        if (ret) {
          break;
        }
        game = moveCursorToNextFlag(game);
      }
      s += gameToScore(game, me);
    }
    const key = gameToStr(start);
    const v = cache[key];
    if (v !== undefined) {
      cache[key] = { score: v.score + s, num_trial: v.num_trial + NUM_TRIAL };
    } else {
      cache[key] = { score: s, num_trial: NUM_TRIAL };
      s = s / NUM_TRIAL;
    }
  }
};

const playRandomUntilMyTurn = async (
  candidateOfOpponent: Game[],
  me: PlayerID
): Promise<Game[]> => {
  let game: Game = getRandomElement(candidateOfOpponent);
  for (let i = 0; i < 50; i++) {
    if (game.phase === "PutFlag") {
      const n1 = countUsedFlag(FirstPlayer, game);
      const n2 = countUsedFlag(SecondPlayer, game);
      if (n1 === game.numInitialFlag && n2 === game.numInitialFlag) {
        game = { ...game, phase: "RunProgram" };
      } else {
        let currentPlayer: PlayerID;
        if (n1 === n2) {
          currentPlayer = FirstPlayer;
        } else {
          currentPlayer = SecondPlayer;
          // Put SecondPlayer
        }
        if (currentPlayer === me) {
          const candidate = getCandidateToPutFlag(game, me);
          return candidate;
        }
        game = await putOneFlag(game, currentPlayer, chooseRandom);
      }
      continue;
    }

    const currentCard = getCurrentCard(game);
    const currentPlayer = currentCard.flags[game.cursor.flagIndex];
    if (currentPlayer === undefined) {
      game = moveCursorToNextCard(game);
      continue;
    }
    if (currentPlayer === me) {
      const candidate = currentCard.getCandidate(game, me);
      return candidate;
    }
    game = await currentCard.play(game, currentPlayer, chooseRandom);
    const ret = isGameOver(game);
    if (ret) {
      return [];
    }
    game = moveCursorToNextFlag(game);
  }
  return [];
};

onmessage = (e: any) => {
  if (e.data.type === "start") {
    start(e.data.candidateOfOpponent, e.data.mySide);
  } else if (e.data.type === "finish") {
    gCandidateOfOpponent = [];
    // @ts-ignore
    postMessage(cache);
  }
};

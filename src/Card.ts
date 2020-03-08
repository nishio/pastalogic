import { PlayerID, AlgorithToChooseCandidate } from "./Types";
import { Game } from "./Game";

export type Card = {
  name: string;
  flags: PlayerID[];
  getCandidate: (game: Game, playerId: PlayerID) => Game[];
  play: (
    game: Game,
    playerId: PlayerID,
    algorithm: AlgorithToChooseCandidate
  ) => Promise<Game> | Game;
  numIncrementToken: number;
  numDecrementToken: number;
  repeat: (game: Game) => number;
};

export const constUsedFlag = (playerId: PlayerID, game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    c.flags.forEach(f => {
      if (f === playerId) {
        ret++;
      }
    });
  });
  return ret;
};

export const countUsedIncrementToken = (game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numIncrementToken;
  });
  return ret;
};

export const countUsedDecrementToken = (game: Game) => {
  let ret = 0;
  game.cards.forEach(c => {
    ret += c.numDecrementToken;
  });
  return ret;
};

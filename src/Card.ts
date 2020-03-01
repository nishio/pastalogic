import { PlayerID, Game } from "./Types";
import { getOpponent } from "./util";
export type Card = {
  name: string;
  flags: PlayerID[];
  play: (game: Game, playerId: PlayerID) => Game;
};
export const Bug = () => {
  return {
    name: "Bug",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      const nextPlayers = [...game.players];
      nextPlayers[getOpponent(playerId)].life--;
      return { ...game, players: nextPlayers };
    }
  };
};
export const AddFlag = () => {
  return {
    name: "AddFlag",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      return game;
    }
  };
};
export const Subroutine = () => {
  return {
    name: "Subroutine",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      return game;
    }
  };
};
export const MoveFlag = () => {
  return {
    name: "MoveFlag",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      return game;
    }
  };
};
export const Increment = () => {
  return {
    name: "Increment",
    flags: [],
    play: (game: Game, playerId: PlayerID) => {
      return game;
    }
  };
};

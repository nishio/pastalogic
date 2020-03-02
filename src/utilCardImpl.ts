import { Game, PlayerID, CursorDirection } from "./Types";
import { getOpponent, getCurrentCard } from "./util";
import { isGameOver } from "./isGameOver";

// utility for card definition

export const createCard = (
  name: string,
  play: (game: Game, playerId: PlayerID) => Game
) => {
  return {
    name: name,
    flags: [],
    play: play,
    numIncrementToken: 0,
  }
}

export const repeat = (n: number, game: Game, step: (game: Game) => Game) => {
  for (let i = 0; i < n; i++) {
    game = step(game);
    if (isGameOver(game))
      return game;
  }
  return game;
};

export function attack(game: Game, playerId: PlayerID, damage: number) {
  const nextPlayers = [...game.players];
  nextPlayers[getOpponent(playerId)].life -= damage;
  return { ...game, players: nextPlayers };
}

export function payLife(game: Game, playerId: PlayerID, damage: number) {
  const nextPlayers = [...game.players];
  nextPlayers[playerId].life -= damage;
  return { ...game, players: nextPlayers };
}

export const asParameter = (game: Game, base: number) => {
  return base + getCurrentCard(game).numIncrementToken;
};

export const reverse = (v: CursorDirection): CursorDirection => {
  if (v === "forward") {
    return "backward"
  }
  return "forward"
}

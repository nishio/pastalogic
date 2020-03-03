import { PlayerID, CursorDirection, AlgorithToChooseCandidate } from "./Types";
import { Game } from "./Game";
import { getOpponent, getCurrentCard, updateFlag } from "./util";
import { isGameOver } from "./isGameOver";
import { Card } from "./Card";

// utility for card definition

export const createCard = (
  name: string,
  getCandidate: (game: Game, playerId: PlayerID) => Game[],
  repeat = (game: Game) => 1
): Card => {
  return {
    name: name,
    flags: [],
    getCandidate: getCandidate,
    play: (game: Game, playerId: PlayerID, algorithm: AlgorithToChooseCandidate) => {
      return algorithm(name, playerId, getCandidate(game, playerId))
    },
    repeat: repeat,
    numIncrementToken: 0,
    numDecrementToken: 0,
  }
}

// export const repeat = (n: number, game: Game[], step: (game: Game) => Game[]) => {
//   let result = [];
//   for (let i = 0; i < n; i++) {
//     game = step(game);
//     if (isGameOver(game))
//       return game;
//   }
//   return game;
// };

export function attack(game: Game, playerId: PlayerID, damage: number) {
  const nextPlayers = [...game.players];
  const p = nextPlayers[getOpponent(playerId)];
  let newLife = p.life - damage
  if (newLife > game.maxLife) newLife = game.maxLife;
  nextPlayers[getOpponent(playerId)] = { ...p, life: newLife };
  return { ...game, players: nextPlayers };
}

export function payLife(game: Game, playerId: PlayerID, damage: number) {
  const nextPlayers = [...game.players];
  const p = nextPlayers[playerId];
  let newLife = p.life - damage
  if (newLife > game.maxLife) newLife = game.maxLife;
  nextPlayers[playerId] = { ...p, life: newLife };
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

export const payFlag = (game: Game) => {
  const newFlag = getCurrentCard(game).flags
  newFlag.splice(game.cursor.flagIndex, 1)
  return {
    ...updateFlag(game, game.cursor.cardIndex, newFlag),
    cursor: { ...game.cursor, flagIndex: game.cursor.flagIndex - 1 }
  }
}

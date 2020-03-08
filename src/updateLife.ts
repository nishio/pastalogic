import { PlayerID } from "./Types";
import { Game } from "./Game";
import { getOpponent } from "./getOpponent";

export function updateLife(game: Game, playerId: PlayerID, value: number) {
  const nextPlayers = [...game.players];
  const p = nextPlayers[playerId];
  let newLife = p.life + value;
  if (newLife > game.maxLife) newLife = game.maxLife;
  nextPlayers[playerId] = { ...p, life: newLife };
  return { ...game, players: nextPlayers };
}

export function attack(game: Game, playerId: PlayerID, damage: number) {
  return updateLife(game, getOpponent(playerId), -damage);
}

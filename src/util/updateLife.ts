import { PlayerID } from "../Types";
import { Game } from "../Types";

export const updateLife = (
  game: Game,
  playerId: PlayerID,
  value: number
): Game => {
  const nextPlayers = [...game.players];
  const p = nextPlayers[playerId];
  let newLife = p.life + value;
  if (newLife > game.maxLife) newLife = game.maxLife;
  nextPlayers[playerId] = { ...p, life: newLife };
  return { ...game, players: nextPlayers };
};

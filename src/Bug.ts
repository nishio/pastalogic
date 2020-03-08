import { PlayerID } from "./Types";
import { Game } from "./Game";
import { attack, asParameter, createCard } from "./utilCardImpl";
export const Bug = () => {
  return createCard("Bug", (game: Game, playerId: PlayerID) => {
    return [attack(game, playerId, asParameter(game, 1))];
  });
};

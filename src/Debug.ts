import { PlayerID } from "./Types";
import { Game } from "./Game";
import { asParameter, createCard, payLife, payFlag } from "./utilCardImpl";
export const Debug = () => {
  return createCard("Debug", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = payLife(game, playerId, -asParameter(game, 3));
    candidate.push(payFlag(next));
    return candidate;
  });
};

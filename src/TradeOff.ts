import { PlayerID } from "./Types";
import { Game } from "./Game";
import { attack, asParameter, createCard, payLife } from "./utilCardImpl";
export const TradeOff = () => {
  return createCard("TradeOff", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = payLife(game, playerId, asParameter(game, 1));
    next = attack(game, playerId, asParameter(game, 2));
    candidate.push(next);
    return candidate;
  });
};

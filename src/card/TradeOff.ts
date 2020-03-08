import { PlayerID } from "../Types";
import { Game } from "../Game";
import { asParameter } from "../asParameter";
import { createCard } from "../createCard";
import { getOpponent } from "../getOpponent";
import { updateLife } from "../updateLife";

export const TradeOff = () => {
  return createCard("TradeOff", (game: Game, me: PlayerID) => {
    const candidate = [game];
    let next = updateLife(game, me, -asParameter(game, 1));
    next = updateLife(game, getOpponent(me), -asParameter(game, 2));
    candidate.push(next);
    return candidate;
  });
};

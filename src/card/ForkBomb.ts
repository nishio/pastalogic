import { PlayerID } from "../Types";
import { Game } from "../Game";
import { isGameOver } from "../isGameOver";
import { removeFlagAsCost } from "../removeFlagAsCost";
import { asParameter } from "../asParameter";
import { createCard } from "../createCard";
import { getOpponent } from "../getOpponent";
import { updateLife } from "../updateLife";

export const ForkBomb = () => {
  return createCard("ForkBomb", (game: Game, me: PlayerID) => {
    const candidate = [game];
    let next = updateLife(game, getOpponent(me), asParameter(game, 2));
    if (isGameOver(next)) return [game, next];
    candidate.push(removeFlagAsCost(next));
    return candidate;
  });
};

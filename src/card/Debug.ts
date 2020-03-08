import { PlayerID } from "../Types";
import { Game } from "../Game";
import { removeFlagAsCost } from "../removeFlagAsCost";
import { asParameter } from "../asParameter";
import { createCard } from "../createCard";
import { updateLife } from "../updateLife";

export const Debug = () => {
  return createCard("Debug", (game: Game, me: PlayerID) => {
    const candidate = [game];
    let next = updateLife(game, me, asParameter(game, 3));
    candidate.push(removeFlagAsCost(next));
    return candidate;
  });
};

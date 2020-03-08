import { PlayerID } from "../Types";
import { Game } from "../Types";
import { removeFlagAsCost } from "../util/removeFlagAsCost";
import { asParameter } from "../util/asParameter";
import { createCard } from "../createCard";
import { updateLife } from "../util/updateLife";

export const Debug = () => {
  return createCard("Debug", (game: Game, me: PlayerID) => {
    const candidate = [game];
    let next = updateLife(game, me, asParameter(game, 3));
    candidate.push(removeFlagAsCost(next));
    return candidate;
  });
};

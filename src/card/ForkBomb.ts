import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isGameOver } from "../isGameOver";
import { removeFlagAsCost } from "../util/removeFlagAsCost";
import { asParameter } from "../util/asParameter";
import { createCard } from "../createCard";
import { getOpponent } from "../util/getOpponent";
import { updateLife } from "../util/updateLife";

const getCandidate = (game: Game, me: PlayerID) => {
  const candidate = [game];
  let next = updateLife(game, getOpponent(me), asParameter(game, 2));
  if (isGameOver(next)) return [game, next];
  candidate.push(removeFlagAsCost(next));
  return candidate;
};

export const ForkBomb = () => {
  return createCard({
    name: "ForkBomb",
    getCandidate: getCandidate
  });
};

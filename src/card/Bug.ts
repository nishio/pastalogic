import { PlayerID } from "../Types";
import { Game } from "../Types";
import { asParameter } from "../util/asParameter";
import { createCard } from "../createCard";
import { updateLife } from "../util/updateLife";
import { getOpponent } from "../util/getOpponent";

const getCandidate = (game: Game, me: PlayerID) => {
  return [updateLife(game, getOpponent(me), -asParameter(game, 1))];
};

export const Bug = () => {
  return createCard({
    name: "Bug",
    getCandidate: getCandidate,
    repeatable: false
  });
};

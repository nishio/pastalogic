import { PlayerID } from "../Types";
import { Game } from "../Types";
import { asParameter } from "../util/asParameter";
import { createCard } from "../createCard";
import { updateLife } from "../util/updateLife";
import { getOpponent } from "../util/getOpponent";

export const Bug = () => {
  return createCard("Bug", (game: Game, me: PlayerID) => {
    return [updateLife(game, getOpponent(me), -asParameter(game, 1))];
  });
};

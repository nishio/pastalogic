import { PlayerID } from "../Types";
import { Game } from "../Game";
import { asParameter } from "../asParameter";
import { createCard } from "../createCard";
import { updateLife } from "../updateLife";
import { getOpponent } from "../getOpponent";

export const Bug = () => {
  return createCard("Bug", (game: Game, me: PlayerID) => {
    return [updateLife(game, getOpponent(me), -asParameter(game, 1))];
  });
};

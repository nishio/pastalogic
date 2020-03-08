import { PlayerID } from "../Types";
import { Game } from "../Types";
import { reverseCursorDirection } from "../util/reverseCursorDirection";
import { updateLife } from "../util/updateLife";
import { asParameter } from "../util/asParameter";
import { createCard } from "../createCard";
export const Reverse = () => {
  return createCard("Reverse", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    const cost = asParameter(game, 1);
    if (game.players[playerId].life > cost) {
      const next = {
        ...game,
        cursorDirection: reverseCursorDirection(game.cursorDirection)
      };
      candidate.push(updateLife(next, playerId, -cost));
    }
    return candidate;
  });
};

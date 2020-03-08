import { PlayerID } from "./Types";
import { Game } from "./Game";
import { asParameter, createCard, payLife, reverse } from "./utilCardImpl";
export const Reverse = () => {
  return createCard("Reverse", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    const cost = asParameter(game, 1);
    if (game.players[playerId].life > cost) {
      const next = {
        ...game,
        cursorDirection: reverse(game.cursorDirection)
      };
      candidate.push(payLife(next, playerId, cost));
    }
    return candidate;
  });
};

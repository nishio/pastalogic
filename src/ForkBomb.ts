import { PlayerID } from "./Types";
import { Game } from "./Game";
import { isGameOver } from "./isGameOver";
import { attack, asParameter, createCard, payFlag } from "./utilCardImpl";
export const ForkBomb = () => {
  return createCard("ForkBomb", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    let next = attack(game, playerId, asParameter(game, 2));
    if (isGameOver(next)) return [game, next];
    candidate.push(payFlag(next));
    return candidate;
  });
};

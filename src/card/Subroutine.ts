import { PlayerID } from "../Types";
import { Game } from "../Types";
import { getLoopedCardIndex } from "../util/getLoopedCardIndex";
import { asParameter } from "../util/asParameter";
import { createCard } from "../createCard";
export const Subroutine = () => {
  return createCard("Subroutine", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    const returnAddress = game.cursor.flagIndex + 1;
    const reach = asParameter(game, 1);
    for (let i = -reach; i <= reach; i++) {
      if (i === 0) continue;
      const next = {
        ...game,
        cursor: {
          cardIndex: getLoopedCardIndex(game.cursor.cardIndex, i, game),
          flagIndex: -1,
          repeatIndex: 1
        },
        returnAddress: returnAddress
      };
      candidate.push(next);
    }
    return candidate;
  });
};

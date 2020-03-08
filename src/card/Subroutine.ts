import { PlayerID } from "../Types";
import { Game } from "../Game";
import { getCardIndex } from "../getCardIndex";
import { asParameter } from "../asParameter";
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
          cardIndex: getCardIndex(game, game.cursor.cardIndex, i),
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

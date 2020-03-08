import { PlayerID } from "../Types";
import { Game } from "../Game";
import { updateFlag } from "../updateFlag";
import { hasEnoughSpace } from "../hasEnoughSpace";
import { asParameter } from "../asParameter";
import { createCard } from "../createCard";
export const MoveFlag = () => {
  return createCard(
    "MoveFlag",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game];
      const me = game.cursor.cardIndex;
      game.cards.forEach((ci, i) => {
        if (i === me) return;
        game.cards.forEach((cj, j) => {
          if (j === me) return;
          if (i === j) return;
          if (!hasEnoughSpace(cj)) return;
          ci.flags.forEach((fk, k) => {
            const newCi = [...ci.flags];
            newCi.splice(k, 1);
            const newCj = [...cj.flags, fk];
            let next = updateFlag(game, i, newCi);
            next = updateFlag(next, j, newCj);
            candidate.push(next);
          });
        });
      });
      return candidate;
    },
    game => asParameter(game, 1)
  );
};

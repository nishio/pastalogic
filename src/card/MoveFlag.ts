import { PlayerID } from "../Types";
import { Game } from "../Types";
import { updateFlag } from "../util/updateFlag";
import { hasEnoughSpace } from "../util/hasEnoughSpace";
import { asParameter } from "../util/asParameter";
import { createCard } from "../createCard";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { isCurrentCard } from "../util/isCurrentCard";
import { hasNoFlag } from "../util/hasNoFlag";

export const MoveFlag = () => {
  return createCard(
    "MoveFlag",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game];
      game.cards.forEach((fromCard, i) => {
        if (isCurrentCard(i, game)) return;
        if (hasNoFlag(fromCard)) return;
        if (isSubroutineAndIsUsing(fromCard, game)) return;

        game.cards.forEach((toCard, j) => {
          if (isCurrentCard(j, game)) return;
          if (i === j) return;
          if (!hasEnoughSpace(toCard)) return;
          fromCard.flags.forEach((fk, k) => {
            const newCi = [...fromCard.flags];
            newCi.splice(k, 1);
            const newCj = [...toCard.flags, fk];
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

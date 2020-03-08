import { PlayerID } from "../Types";
import { Game } from "../Game";
import { updateFlag } from "../updateFlag";
import { hasEnoughSpace } from "../hasEnoughSpace";
import { asParameter } from "../asParameter";
import { createCard } from "../createCard";
import { isUsingSubroutine } from "../isUsingSubroutine";
import { isCurrentCard } from "./isCurrentCard";
import { hasNoFlag } from "./hasNoFlag";

export const MoveFlag = () => {
  return createCard(
    "MoveFlag",
    (game: Game, playerId: PlayerID) => {
      const candidate = [game];
      game.cards.forEach((fromCard, i) => {
        if (isCurrentCard(i, game)) return;
        if (hasNoFlag(fromCard)) return;
        if (isUsingSubroutine(fromCard, game)) return;

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

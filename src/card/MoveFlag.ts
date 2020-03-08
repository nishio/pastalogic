import { PlayerID } from "../Types";
import { Game } from "../Types";
import { updateFlag } from "../util/updateFlag";
import { hasEnoughSpace } from "../util/hasEnoughSpace";
import { createCard } from "./createCard";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { isCurrentCard } from "../util/isCurrentCard";
import { hasNoFlag } from "../util/hasNoFlag";
import { removeAFlagFromFlags } from "./removeAFlagFromFlags";

const getCandidate = (game: Game, playerId: PlayerID) => {
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
        const newFromCard = removeAFlagFromFlags(fromCard.flags, k);
        const newToCard = [...toCard.flags, fk];
        let next = updateFlag(game, i, newFromCard);
        next = updateFlag(next, j, newToCard);
        candidate.push(next);
      });
    });
  });
  return candidate;
};

export const MoveFlag = () => {
  return createCard({
    name: "MoveFlag",
    getCandidate: getCandidate,
    repeatable: true
  });
};

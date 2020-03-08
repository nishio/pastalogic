import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { updateFlag } from "../util/updateFlag";
import { createCard } from "./createCard";
import { isCurrentCard } from "../util/isCurrentCard";
import { removeAFlagFromFlags } from "../util/removeAFlagFromFlags";

const getCandidate = (game: Game, playerId: PlayerID) => {
  const candidate = [game];
  game.cards.forEach((card, cardIndex) => {
    if (isCurrentCard(cardIndex, game)) return;
    if (isSubroutineAndIsUsing(card, game)) return;
    if (card.flags.length === 0) return;
    card.flags.forEach((f, flagIndex) => {
      candidate.push(
        updateFlag(game, cardIndex, removeAFlagFromFlags(card.flags, flagIndex))
      );
    });
  });
  return candidate;
};

export const RemoveFlag = () => {
  return createCard({
    name: "RemoveFlag",
    getCandidate: getCandidate,
    repeatable: true
  });
};

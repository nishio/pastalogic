import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { updateFlag } from "../util/updateFlag";
import { createCard } from "../createCard";
import { isCurrentCard } from "../util/isCurrentCard";

const getCandidate = (game: Game, playerId: PlayerID) => {
  const candidate = [game];
  game.cards.forEach((card, cardIndex) => {
    if (isCurrentCard(cardIndex, game)) return;
    if (isSubroutineAndIsUsing(card, game)) return;
    if (card.flags.length === 0) return;
    card.flags.forEach((f, flagIndex) => {
      const newFlags = [...card.flags];
      newFlags.splice(flagIndex, 1);
      candidate.push(updateFlag(game, cardIndex, newFlags));
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

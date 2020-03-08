import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { appendOneFlag } from "../util/appendOneFlag";
import { hasEnoughSpace } from "../util/hasEnoughSpace";
import { createCard } from "./createCard";
import { isCurrentCard } from "../util/isCurrentCard";
import { alreadyUsedAllFlags } from "../util/alreadyUsedAllFlags";

const getCandidate = (game: Game, me: PlayerID) => {
  if (alreadyUsedAllFlags(me, game)) return [game];
  const candidate = [game];
  game.cards.forEach((card, cardIndex) => {
    if (isCurrentCard(cardIndex, game)) return;
    if (isSubroutineAndIsUsing(card, game)) return;
    if (hasEnoughSpace(card)) {
      candidate.push(appendOneFlag(game, cardIndex, me));
    }
  });
  return candidate;
};

export const AddFlag = () => {
  return createCard({
    name: "AddFlag",
    getCandidate: getCandidate,
    repeatable: true
  });
};

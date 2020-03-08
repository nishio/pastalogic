import { PlayerID } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { appendOneFlag } from "../util/appendOneFlag";
import { hasEnoughSpace } from "../util/hasEnoughSpace";
import { createCard } from "../createCard";
import { countUsedFlag } from "../util/countUsedFlag";

const getCandidate = (game: Game, playerId: PlayerID) => {
  if (countUsedFlag(playerId, game) === game.maxFlag) return [game];
  const candidate = [game];
  game.cards.forEach((card, cardIndex) => {
    if (card.name === "AddFlag") return;
    if (isSubroutineAndIsUsing(card, game)) return;
    if (hasEnoughSpace(card)) {
      candidate.push(appendOneFlag(game, cardIndex, playerId));
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

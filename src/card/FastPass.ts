import { PlayerID, MAX_FLAGS_ON_A_CARD } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { updateFlag } from "../util/updateFlag";
import { createCard } from "./createCard";
import { countUsedFlag } from "../util/countUsedFlag";
import { isCurrentCard } from "../util/isCurrentCard";
import { updateLife } from "../util/updateLife";

const getCandidate = (game: Game, playerId: PlayerID) => {
  if (countUsedFlag(playerId, game) === game.maxFlag) return [game];
  const candidate = [game];
  game.cards.forEach((card, cardIndex) => {
    if (isCurrentCard(cardIndex, game)) return;
    if (isSubroutineAndIsUsing(card, game)) return;
    const newFlags = [...card.flags];
    newFlags.unshift(playerId);
    if (newFlags.length > MAX_FLAGS_ON_A_CARD) {
      newFlags.pop();
    }
    let next = updateFlag(game, cardIndex, newFlags);
    next = updateLife(next, playerId, -1);
    candidate.push(next);
  });
  return candidate;
};

export const FastPass = () => {
  return createCard({
    name: "FastPass",
    getCandidate: getCandidate,
    repeatable: true
  });
};

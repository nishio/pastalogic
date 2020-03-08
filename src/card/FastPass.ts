import { PlayerID, MAX_FLAGS_ON_A_CARD } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { updateFlag } from "../util/updateFlag";
import { createCard } from "./createCard";
import { countUsedFlag } from "../util/countUsedFlag";
import { isCurrentCard } from "../util/isCurrentCard";

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
    candidate.push(updateFlag(game, cardIndex, newFlags));
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

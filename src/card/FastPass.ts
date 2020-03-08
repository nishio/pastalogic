import { PlayerID, MAX_FLAGS_ON_A_CARD } from "../Types";
import { Game } from "../Types";
import { isSubroutineAndIsUsing } from "../util/isUsingSubroutine";
import { updateFlag } from "../util/updateFlag";
import { createCard } from "../createCard";
import { countUsedFlag } from "./Card";

export const FastPass = () => {
  return createCard("FastPass", (game: Game, playerId: PlayerID) => {
    if (countUsedFlag(playerId, game) === game.maxFlag) return [game];
    const candidate = [game];
    game.cards.forEach((card, cardIndex) => {
      if (card.name === "FastPass") return;
      if (isSubroutineAndIsUsing(card, game)) return;
      const newFlags = [...card.flags];
      newFlags.unshift(playerId);
      if (newFlags.length > MAX_FLAGS_ON_A_CARD) {
        newFlags.pop();
      }
      candidate.push(updateFlag(game, cardIndex, newFlags));
    });
    return candidate;
  });
};

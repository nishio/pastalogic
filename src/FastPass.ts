import { PlayerID } from "./Types";
import { Game } from "./Game";
import { updateFlag, isUsingSubroutine } from "./util";
import { createCard } from "./utilCardImpl";
import { constUsedFlag } from "./Card";
export const FastPass = () => {
  return createCard("FastPass", (game: Game, playerId: PlayerID) => {
    if (constUsedFlag(playerId, game) === game.maxFlag) return [game];
    const candidate = [game];
    game.cards.forEach((card, cardIndex) => {
      if (card.name === "FastPass") return;
      if (isUsingSubroutine(card, game)) return;
      const newFlags = [...card.flags];
      newFlags.unshift(playerId);
      if (newFlags.length === 5) {
        newFlags.pop();
      }
      candidate.push(updateFlag(game, cardIndex, newFlags));
    });
    return candidate;
  });
};

import { PlayerID } from "./Types";
import { Game } from "./Game";
import { updateCard } from "./updateCard";
import { createCard } from "./utilCardImpl";
import { countUsedDecrementToken } from "./Card";
export const Decrement = () => {
  return createCard("Decrement", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    if (countUsedDecrementToken(game) < 2) {
      game.cards.forEach((card, cardIndex) => {
        const next = updateCard(game, cardIndex, card => ({
          ...card,
          numDecrementToken: card.numDecrementToken + 1
        }));
        candidate.push(next);
      });
    }
    return candidate;
  });
};

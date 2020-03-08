import { PlayerID } from "./Types";
import { Game } from "./Game";
import { updateCard } from "./updateCard";
import { createCard } from "./utilCardImpl";
import { countUsedIncrementToken } from "./Card";
export const Increment = () => {
  return createCard("Increment", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    if (countUsedIncrementToken(game) < 2) {
      game.cards.forEach((card, cardIndex) => {
        const next = updateCard(game, cardIndex, card => ({
          ...card,
          numIncrementToken: card.numIncrementToken + 1
        }));
        candidate.push(next);
      });
    }
    return candidate;
  });
};

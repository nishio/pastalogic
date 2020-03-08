import { PlayerID } from "../Types";
import { Game } from "../Types";
import { updateCard } from "../util/updateCard";
import { createCard } from "../createCard";
import { countUsedDecrementToken } from "../util/countUsedDecrementToken";

const getCandidate = (game: Game, playerId: PlayerID) => {
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
};

export const Decrement = () => {
  return createCard({
    name: "Decrement",
    getCandidate: getCandidate
  });
};

import { PlayerID } from "../Types";
import { Game } from "../Types";
import { updateCard } from "../util/updateCard";
import { createCard } from "./createCard";
import { countUsedIncrementToken } from "../util/countUsedIncrementToken";

const getCandidate = (game: Game, playerId: PlayerID) => {
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
};

export const Increment = () => {
  return createCard({
    name: "Increment",
    getCandidate: getCandidate
  });
};

import { PlayerID } from "../Types";
import { Game } from "../Types";
import { getCurrentCard } from "../util/getCurrentCard";
import { createCard } from "../createCard";
import { isCurrentCard } from "../util/isCurrentCard";

const getCandidate = (game: Game, playerId: PlayerID) => {
  const candidate = [game];
  game.cards.forEach((card, cardIndex) => {
    if (isCurrentCard(cardIndex, game)) return;
    const newCards = [...game.cards];
    newCards[cardIndex] = getCurrentCard(game);
    newCards[game.cursor.cardIndex] = card;
    const next = {
      ...game,
      cards: newCards,
      cursor: { ...game.cursor, cardIndex: cardIndex }
    };
    candidate.push(next);
  });
  return candidate;
};

export const SwapCommand = () => {
  return createCard({
    name: "SwapCommand",
    getCandidate: getCandidate
  });
};

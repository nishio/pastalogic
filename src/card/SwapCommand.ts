import { PlayerID } from "../Types";
import { Game } from "../Game";
import { getCurrentCard } from "../getCurrentCard";
import { createCard } from "../createCard";
export const SwapCommand = () => {
  return createCard("SwapCommand", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    game.cards.forEach((card, cardIndex) => {
      if (card.name === "SwapCommand") return;
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
  });
};

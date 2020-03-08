import { PlayerID } from "../Types";
import { Game } from "../Types";
import { createCard } from "../createCard";
export const RemoveCommand = () => {
  return createCard("RemoveCommand", (game: Game, playerId: PlayerID) => {
    const candidate = [game];
    game.cards.forEach((card, cardIndex) => {
      const newCards = [...game.cards];
      newCards.splice(cardIndex, 1);
      let newCursor = { ...game.cursor };
      if (cardIndex < game.cursor.cardIndex) {
        newCursor.cardIndex--;
      } else if (cardIndex === game.cursor.cardIndex) {
        // remove self
        if (game.cursorDirection === "forward") {
          newCursor.cardIndex--;
        } else {
          // when cursorDirection is backward, keep cardIndex
          // except for RemoveCommand is the last card
          if (newCards.length === newCursor.cardIndex) {
            newCursor = {
              cardIndex: 0,
              flagIndex: 4,
              repeatIndex: 1
            };
          }
        }
        newCursor.flagIndex = 4;
      }
      candidate.push({
        ...game,
        cards: newCards,
        cursor: newCursor
      });
    });
    return candidate;
  });
};

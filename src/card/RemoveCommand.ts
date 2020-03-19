import { PlayerID } from "../Types";
import { Game } from "../Types";
import { createCard } from "./createCard";

const getCandidate = (game: Game, playerId: PlayerID) => {
  const candidate = [game];
  game.cards.forEach((card, cardIndex) => {
    const newCards = [...game.cards];
    newCards.splice(cardIndex, 1);
    let newCursor = { ...game.cursor };
    if (cardIndex < game.cursor.cardIndex) {
      newCursor = {
        cardIndex: game.cursor.cardIndex - 1,
        flagIndex: game.cursor.flagIndex, // keep
        repeatIndex: game.cursor.repeatIndex // keep
      };
    } else if (cardIndex === game.cursor.cardIndex) {
      // remove self
      if (game.cursorDirection === "forward") {
        if (cardIndex === 0) {
          newCursor = {
            cardIndex: newCards.length - 1, // last card
            flagIndex: 4, // last
            repeatIndex: 4 // last
          };
        } else {
          newCursor = {
            cardIndex: game.cursor.cardIndex - 1, // previous card
            flagIndex: 4, // last
            repeatIndex: 4 // last
          };
        }
      } else {
        // when cursorDirection is backward, keep cardIndex
        // except for RemoveCommand is the last card
        if (newCards.length === newCursor.cardIndex) {
          newCursor = {
            cardIndex: 0,
            flagIndex: 4,
            repeatIndex: 4
          };
        } else {
          newCursor = {
            cardIndex: game.cursor.cardIndex, // previous card
            flagIndex: 4, // last
            repeatIndex: 4 // last
          };
        }
      }
    }
    candidate.push({
      ...game,
      cards: newCards,
      cursor: newCursor
    });
  });
  return candidate;
};

export const RemoveCommand = () => {
  return createCard({
    name: "RemoveCommand",
    getCandidate: getCandidate
  });
};

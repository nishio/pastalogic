import { Game } from "./Game";
import { updateCard } from "./updateCard";
import { neverComeHere } from "./assertion";
import { findCard } from "./findCard";
import { getNextCardIndex } from "./getNextCardIndex";
export const moveCursorToNextCard = (game: Game): Game => {
  game = updateCard(game, game.cursor.cardIndex, card => {
    return {
      ...card,
      numDecrementToken: 0,
      numIncrementToken: 0
    };
  });
  if (game.returnAddress !== null) {
    // Subroutine call finished, return to Subroutine
    const cardIndex = findCard("Subroutine", game);
    if (cardIndex === -1) {
      neverComeHere("card Subroutine is not found when return to it");
    }
    //console.log(`return ${cardIndex},${game.returnAddress}`)
    return {
      ...game,
      cursor: {
        cardIndex: cardIndex,
        flagIndex: game.returnAddress,
        repeatIndex: 1
      },
      returnAddress: null
    };
  }
  return {
    ...game,
    cursor: {
      cardIndex: getNextCardIndex(game, game.cursor.cardIndex),
      flagIndex: 0,
      repeatIndex: 1
    }
  };
};

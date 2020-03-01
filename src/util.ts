import { Game, PlayerID } from "./Types";
import { Card } from "./Card";

const neverComeHere = (msg?: string) => {
  throw new Error(msg)
}

export const moveCursorToNextCard = (game: Game) => {
  if (game.returnAddress !== null) {
    // Subroutine call finished, return to Subroutine
    const cardIndex = game.cards.findIndex((card) => card.name === "Subroutine")
    if (cardIndex === -1) {
      neverComeHere("card Subroutine is not found when return to it")
    }
    return {
      ...game,
      cursor: {
        cardIndex: cardIndex,
        flagIndex: game.returnAddress,
        returnAddress: null
      }
    }
  }

  return {
    ...game,
    cursor: {
      cardIndex: getNextCardIndex(game, game.cursor.cardIndex),
      flagIndex: 0
    }
  };
};
export const moveCursorToNextFlag = (game: Game) => {
  return {
    ...game,
    cursor: {
      ...game.cursor,
      flagIndex: game.cursor.flagIndex + 1
    }
  };
};

const getNextCardIndex = (game: Game, index: number) => {
  return (index + 1) % game.cards.length;
};

export const getCardIndex = (game: Game, index: number, change: number) => {
  return (index + change + game.cards.length) % game.cards.length;
};

export const getOpponent = (p: PlayerID) => {
  return 1 - p;
};

export const chooseFirst = (type: string, candidate: Game[]) => (candidate[0])

export const hasEnoughSpace = (card: Card) => {
  return card.flags.length < 4;
}

export const getCurrentCard = (game: Game) => {
  return game.cards[game.cursor.cardIndex];
}

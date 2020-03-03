import { PlayerID } from "./Types";
import { Game } from "./Game";
import { Card } from "./Card";
import { updateCard } from "./updateCard";

export const neverComeHere = (msg?: string) => {
  throw new Error(msg)
}

export const moveCursorToNextCard = (game: Game): Game => {
  game = updateCard(game, game.cursor.cardIndex, (card) => {
    return {
      ...card,
      numDecrementToken: 0,
      numIncrementToken: 0
    }
  })

  if (game.returnAddress !== null) {
    // Subroutine call finished, return to Subroutine
    const cardIndex = findCard("Subroutine", game)
    if (cardIndex === -1) {
      neverComeHere("card Subroutine is not found when return to it")
    }
    //console.log(`return ${cardIndex},${game.returnAddress}`)
    return {
      ...game,
      cursor: {
        cardIndex: cardIndex,
        flagIndex: game.returnAddress,
        repeatIndex: 1,
      },
      returnAddress: null
    }
  }

  return {
    ...game,
    cursor: {
      cardIndex: getNextCardIndex(game, game.cursor.cardIndex),
      flagIndex: 0,
      repeatIndex: 1,
    }
  };
};

export const moveCursorToNextFlag = (game: Game): Game => {
  if (game.cursor.repeatIndex === getCurrentCard(game).repeat(game)) {
    // go next flag
    return {
      ...game,
      cursor: {
        ...game.cursor,
        flagIndex: game.cursor.flagIndex + 1,
        repeatIndex: 1
      },
      time: game.time + 1
    };
  }

  return {
    ...game,
    cursor: {
      ...game.cursor,
      repeatIndex: game.cursor.repeatIndex + 1
    },
    time: game.time + 1
  };
};

const getNextCardIndex = (game: Game, index: number) => {
  if (game.cursorDirection === "forward") {
    return (index + 1) % game.cards.length;
  } else {
    return (index - 1 + game.cards.length) % game.cards.length;
  }
};

export const getCardIndex = (game: Game, index: number, change: number) => {
  return (index + change + game.cards.length) % game.cards.length;
};

export const getOpponent = (p: PlayerID): PlayerID => {
  return (1 - p) as PlayerID;
};

export const chooseFirst = (type: string, playerId: PlayerID, candidate: Game[]) => (candidate[0])

export const hasEnoughSpace = (card: Card) => {
  return card.flags.length < 4;
}

export const getCurrentCard = (game: Game): Card => {
  if (game.cursor.cardIndex >= game.cards.length) {
    debugger;
    neverComeHere("pointing out of cards")
  }
  return game.cards[game.cursor.cardIndex];
}

export const appendOneFlag = (game: Game, cardIndex: number, playerId: PlayerID) => {
  return updateCard(game, cardIndex, (card) => ({
    ...card,
    flags: [...card.flags, playerId]
  }));
}

export const updateFlag = (game: Game, cardIndex: number, newFlag: PlayerID[]) => {
  return updateCard(game, cardIndex, (card) => ({
    ...card, flags: newFlag
  }))
}

export const isUsingSubroutine = (card: Card, game: Game) => {
  return card.name === "Subroutine" && game.returnAddress !== null;
}

export const findCard = (name: string, game: Game) => {
  return game.cards.findIndex((card) => card.name === name);
}


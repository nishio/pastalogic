import { Game, PlayerID } from "./Types";
import { Card } from "./Card";
import { updateCard } from "./updateCard";

export const neverComeHere = (msg?: string) => {
  throw new Error(msg)
}

export const moveCursorToNextCard = (game: Game): Game => {
  const card = getCurrentCard(game);

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
      },
      returnAddress: null
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

export const chooseRandom = (type: string, playerId: PlayerID, candidate: Game[]) => (
  candidate[Math.floor(Math.random() * candidate.length)]
)

let index = 0;
let buffer = [1, 2, 3, 4, 5, 6, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 51]
export const controledRandom = () => {
  const ret = buffer[index]
  index++
  index %= buffer.length
  return ret
}
export const chooseControledRandom = (type: string, playerId: PlayerID, candidate: Game[]) => {
  return candidate[controledRandom() % candidate.length]
}

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

